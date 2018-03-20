import React, { Component } from 'react';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import Header from './components/Header/Header'
import Wrapper from './components/Wrapper/Wrapper'
import Content from './components/Content/Content'
import Footer from './components/Footer/Footer'
import FooterNav from './components/FooterNav/FooterNav'



class App extends Component {
  constructor(){
    super();
    this.state = {
      authToken: 'Bearer f0c8744303034f25b9d278bf4fd05235',
      model: 'en-US_BroadbandModel',
      rawMessages: [],
      formattedMessages: [],
      audioSource: null,
      message: '',
      speakerLabels: false,
      txt: '',
      visible : true,
      // transcript model and keywords are the state that they were when the button was clicked.
      // Changing them during a transcription would cause a mismatch between the setting sent to the
      // service and what is displayed on the demo, and could cause bugs.
      settingsAtStreamStart: {
        model: '',
        keywords: [],
        speakerLabels: false,
      },
      error: null,
    };
  }

  reset() {
    if (this.state.audioSource) {
      this.stopTranscription();
    }
    this.setState({ rawMessages: [], formattedMessages: [], error: null });
  };
  captureSettings() {
    this.setState({
      settingsAtStreamStart: {
        model: this.state.model,
        speakerLabels: this.state.speakerLabels,
      },
    });
  };

  stopTranscription() {
    if (this.stream) {
      this.stream.stop();
      // this.stream.removeAllListeners();
      // this.stream.recognizeStream.removeAllListeners();
    }
    this.setState({ audioSource: null });
  };

  getRecognizeOptions(extra) {
    return Object.assign({
      // formats phone numbers, currency, etc. (server-side)
      token: this.state.token,
      smart_formatting: false,
      format: false, // adds capitals, periods, and a few other things (client-side)
      model: this.state.model,
      objectMode: false,
      interim_results: false,
      timestamps: false, // set timestamps for each word - automatically turned on by speaker_labels
      // includes the speaker_labels in separate objects unless resultsBySpeaker is enabled
      speaker_labels: this.state.speakerLabels,
      // combines speaker_labels and results together into single objects,
      // making for easier transcript outputting
      resultsBySpeaker: this.state.speakerLabels,
      // allow interim results through before the speaker has been determined
      speakerlessInterim: this.state.speakerLabels,
    }, extra);
  }


  handleMicClick = () => {
    if(this.state.message === "Stop" || this.state.message === "Stop.") {
      console.log('Stopiing it!')
    }

    if (this.state.audioSource === 'mic') {
      this.stopTranscription();
      return;
    }
    this.reset();
    console.log('working');
    this.setState({ audioSource: 'mic' });
    this.handleStream(recognizeMicrophone(this.getRecognizeOptions()));
  };

  handleStream(stream) {
    console.log(stream);
    // cleanup old stream if appropriate
    if (this.stream) {
      this.stream.stop();
      this.stream.removeAllListeners();
      this.stream.recognizeStream.removeAllListeners();
    }
    this.stream = stream;
    this.captureSettings();

    // grab the formatted messages and also handle errors and such
    stream.setEncoding('utf8');
    stream.on('data', this.handleFormattedMessage);
    stream.on('end', this.handleTranscriptEnd);
    stream.on('error', this.handleError);
    // when errors occur, the end event may not propagate through the helper streams.
    // However, the recognizeStream should always fire a end and close events
    stream.recognizeStream.on('end', () => {
      if (this.state.error) {
        this.handleTranscriptEnd();
      }
    });

    // grab raw messages from the debugging events for display on the JSON tab
    stream.recognizeStream
      .on('message', (frame, json) => this.handleRawMessage({ sent: false, frame, json }))
      .on('send-json', json => this.handleRawMessage({ sent: true, json }))
      .once('send-data', () => this.handleRawMessage({
        sent: true, binary: true, data: true, // discard the binary data to avoid waisting memory
      }))
      .on('close', (code, message) => this.handleRawMessage({ close: true, code, message }));

    // ['open','close','finish','end','error', 'pipe'].forEach(e => {
    //     stream.recognizeStream.on(e, console.log.bind(console, 'rs event: ', e));
    //     stream.on(e, console.log.bind(console, 'stream event: ', e));
    // });
  };
  handleRawMessage(msg) {
    this.setState({ rawMessages: this.state.rawMessages.concat(msg) });
  };

  handleFormattedMessage = (msg) => {
    this.setState({ txt: msg});
    console.log(this.state.txt);
    let text = JSON.stringify(this.state.txt);
    console.log(text);

    fetch('https://api.api.ai/v1/query?v=20160910',{
                method: 'post',
                headers: {'Content-Type': 'application/json', 'Authorization': this.state.authToken},
                body: JSON.stringify({
                    query: this.state.txt,
                    lang: "en",
                    sessionId: "somerandomthing"
                })
            }).then(response => response.json())
              .then(response2 => {
                this.setState({ message: response2.result.fulfillment.speech});
                console.log(response2.result.fulfillment.speech)});
  };

  handleTranscriptEnd = () => {
    // note: this function will be called twice on a clean end,
    // but may only be called once in the event of an error
    this.setState({ audioSource: null });
  };

  componentDidMount() {
    this.fetchToken();
    // tokens expire after 60 minutes, so automatcally fetch a new one ever 50 minutes
    // Not sure if this will work properly if a computer goes to sleep for > 50 minutes
    // and then wakes back up
    // react automatically binds the call to this
    // eslint-disable-next-line
    this.setState({ tokenInterval: setInterval(this.fetchToken, 50 * 60 * 1000) });
  };

  componentWillUnmount() {
    clearInterval(this.state.tokenInterval);
  };

  fetchToken() {
    return fetch('http://localhost:3000/api/speech-to-text/token').then((res) => {
      if (res.status !== 200) {
        throw new Error('Error retrieving auth token');
      }
      return res.text();
    }) // todo: throw here if non-200 status
      .then(token => this.setState({ token })).catch(this.handleError);
  };
  getFinalResults() {
    return this.state.formattedMessages.filter(r => r.results &&
      r.results.length && r.results[0].final);
  };

  getCurrentInterimResult() {
    const r = this.state.formattedMessages[this.state.formattedMessages.length - 1];

    // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
    // However, all results in a given message will be either final or interim, so just checking
    // the first one still works here.
    if (!r || !r.results || !r.results.length || r.results[0].final) {
      return null;
    }
    return r;
  };

  getFinalAndLatestInterimResult() {
    const final = this.getFinalResults();
    const interim = this.getCurrentInterimResult();
    if (interim) {
      final.push(interim);
    }
    return final;
  };

  handleError = (err, extra) => {
    console.error(err, extra);
    if (err.name === 'UNRECOGNIZED_FORMAT') {
      err = 'Unable to determine content type from file name or header; mp3, wav, flac, ogg, opus, and webm are supported. Please choose a different file.';
    } else if (err.name === 'NotSupportedError' && this.state.audioSource === 'mic') {
      err = 'This browser does not support microphone input.';
    } else if (err.message === '(\'UpsamplingNotAllowed\', 8000, 16000)') {
      err = 'Please select a narrowband voice model to transcribe 8KHz audio files.';
    } else if (err.message === 'Invalid constraint') {
      // iPod Touch does this on iOS 11 - there is a microphone, but Safari claims there isn't
      err = 'Unable to access microphone';
    }
    this.setState({ error: err.message || err });
  }

   closeModal() {
        this.setState({
            visible : false
        });
    }

  render(){
    return(
      <div className="App">
      <Header />
      <Wrapper />
      <Content onClickChange={this.handleMicClick} message={this.state.message}/>
      <Footer />
      <FooterNav />
      </div>
    );
  }
}
export default App;