function Operator(type, c_rat, output) {
  this.portamento = 0.05;
  this.coarse_ratio = c_rat;
  this.fine_ratio = 0.0;
  this.osc = context.createOscillator();
  this.gainNode = context.createGain();
  this.osc.type = type;
  this.osc.frequency.value = 440;
  this.gainNode.gain.value = 0.0;
  this.osc.connect(this.gainNode);
  if (output === 'destination') {
    this.gainNode.connect(context.destination);
  } else {
    this.gainNode.connect(output.osc.frequency);
  };
  this.osc.start(0);
  this.setFrequency = function(f_in) {
    this.osc.frequency.value = (f_in * this.coarse_ratio) + (f_in * this.fine_ratio);
  };
  this.setGain = function(gain_in) {
    this.gainNode.gain.value = gain_in / 1024;
  }
};

function onMIDIInit(midi) {
  midiAccess = midi;

  if ((typeof(midiAccess.inputs) == "function")) {  //Old Skool MIDI inputs() code
    var inputs=midiAccess.inputs();
    if (inputs.length === 0)
      alert("No MIDI input devices present.  You're gonna have a bad time.")
    else { // Hook the message handler for all MIDI inputs
      for (var i=0;i<inputs.length;i++)
        inputs[i].onmidimessage = MIDIMessageEventHandler;
    }
  } else {  // new MIDIMap implementation
    var haveAtLeastOneDevice=false;
      var inputs=midiAccess.inputs.values();
      for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = MIDIMessageEventHandler;
        haveAtLeastOneDevice = true;
      }
      if (!haveAtLeastOneDevice)
      alert("No MIDI input devices present.  You're gonna have a bad time.");
  }
}

function onMIDIReject(err) {
  alert("The MIDI system failed to start.  You're gonna have a bad time.");
}

function MIDIMessageEventHandler(event) {
  // Channel data in lower nibble ignored for now. (omni mode) WIP
  switch (event.data[0] & 0xf0) {
    case 0x90:
      if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
        noteOn(event.data[1]);
        return;
      }
      // if velocity == 0, fall thru: it's a note-off.
    case 0x80:
      noteOff(event.data[1]);
      return;
  }
}

function frequencyFromNoteNumber( note ) {
  return 440 * Math.pow(2,(note-69)/12);
}

function noteOn(noteNumber) {
  activeNotes.push( noteNumber );
  op1.osc.frequency.cancelScheduledValues(0);
  op1.osc.frequency.setTargetAtTime( frequencyFromNoteNumber(noteNumber), 0, op1.portamento );
  op1.gainNode.gain.value = 1;
}

function noteOff(noteNumber) {
  var position = activeNotes.indexOf(noteNumber);
  if (position!=-1) {
    activeNotes.splice(position,1);
  }
  if (activeNotes.length==0) {
    op1.gainNode.gain.value = 0;
  } else {
    op1.osc.frequency.cancelScheduledValues(0);
    op1.osc.frequency.setTargetAtTime( frequencyFromNoteNumber(activeNotes[activeNotes.length-1]), 0, op1.portamento );
  }
}

var F_IN_STUB = 440; //to be removed when mod pitch from midi is added. WIP

var context=null;   // the Web Audio "context" object
var midiAccess=null;  // the MIDIAccess object.
var activeNotes = []; // the stack of actively-pressed keys

window.addEventListener('load', function() {
  window.AudioContext=window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();
  context.sampleRate = 44100;

  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
  } else {
    alert("No MIDI support present in your browser.  You're gonna have a bad time.")
  };

  var op1 = new Operator('sine', 1, 'destination');
  var op2 = new Operator('sine', 2, 'destination');
  var op3 = new Operator('sine', 3, 'destination');
  var op4 = new Operator('sine', 4, 'destination');
  var op5 = new Operator('sine', 5, 'destination');
  var op6 = new Operator('sine', 6, 'destination');
  var op7 = new Operator('sine', 7, 'destination');
  var op8 = new Operator('sine', 8, 'destination');
  var op9 = new Operator('sine', 9, 'destination');
  var op10 = new Operator('sine', 10, 'destination');
  var op11 = new Operator('sine', 11, 'destination');
  var op12 = new Operator('sine', 12, 'destination');
  var op13 = new Operator('sine', 13, 'destination');
  var op14 = new Operator('sine', 14, 'destination');
  var op15 = new Operator('sine', 15, 'destination');
  var op16 = new Operator('sine', 16, 'destination');

  // var op3 = new Operator('sine', 440, 1000, op2);

  setInterval( function() {
    f_in = F_IN_STUB; // system pitch (i.e. midi note or cv derived value)
    // should come from midi input. WIP
    op1.setGain(ReadSliders("#op1_gain"));
    op1.setFrequency(f_in);
    op2.setGain(ReadSliders("#op2_gain"));
    op2.setFrequency(f_in);
    op3.setGain(ReadSliders("#op3_gain"));
    op3.setFrequency(f_in);
    op4.setGain(ReadSliders("#op4_gain"));
    op4.setFrequency(f_in);
    op5.setGain(ReadSliders("#op5_gain"));
    op5.setFrequency(f_in);
    op6.setGain(ReadSliders("#op6_gain"));
    op6.setFrequency(f_in);
    op7.setGain(ReadSliders("#op7_gain"));
    op7.setFrequency(f_in);
    op8.setGain(ReadSliders("#op8_gain"));
    op8.setFrequency(f_in);
    op9.setGain(ReadSliders("#op9_gain"));
    op9.setFrequency(f_in);
    op10.setGain(ReadSliders("#op10_gain"));
    op10.setFrequency(f_in);
    op11.setGain(ReadSliders("#op11_gain"));
    op11.setFrequency(f_in);
    op12.setGain(ReadSliders("#op12_gain"));
    op12.setFrequency(f_in);
    op13.setGain(ReadSliders("#op13_gain"));
    op13.setFrequency(f_in);
    op14.setGain(ReadSliders("#op14_gain"));
    op14.setFrequency(f_in);
    op15.setGain(ReadSliders("#op15_gain"));
    op15.setFrequency(f_in);
    op16.setGain(ReadSliders("#op16_gain"));
    op16.setFrequency(f_in);
  }, 1000/60);

});

// UI Here
$( document ).ready(function() {
  $(function() {
    $( "#op1_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op2_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op3_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op4_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op5_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op6_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op7_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op8_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op9_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op10_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op11_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op12_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op13_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op14_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op15_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
  $(function() {
    $( "#op16_gain" ).slider({
      min: 0,
      max: 1023,
      orientation: "vertical"
    });
  });
});


function ReadSliders(selector) {
  return $( selector ).slider( "value" );
};









