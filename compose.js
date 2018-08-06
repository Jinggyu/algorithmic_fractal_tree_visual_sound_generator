function Compose(){
  var tree = new Tree();
  var count = 500;
  var time = 0;

// run drawing  
  this.tree = function(){
    tree.grow();
    tree.show();
  }
// Convert continuous reachedpoint data into discrete numbers and then trigger synth.
// --------------------- not triggering every point to avoid the very fast frequency switch, which will damage this patch ------------
//******************************************Better solution might be required ********************************************************
  this.composeSound = function(){
    if (tree.countleaves){
    for (var i = count; i > 0; i--){
    if (i === tree.countleaves){
         count = tree.countleaves;
          i =0;
       } else {
      count = null
       }
     if (i!==0){
       time ++
       if (time===6){
         time =0;
             }
       if (time === floor(random(1,5))){
          this.makenotes();
             } 
          } 
       }
     }
    }
// *************************************************************************************************************************************
  // giving a osc to start
  this.toStart = function(freqstart){
    var volumes = new Tone.Volume(-24);
    var echo = new Tone.FeedbackDelay( '1n', 0.5);
    var OSC = new Tone.Synth(
        {oscillator : {
  	    type : 'sine',
        modulationType : 'square',
        modulationIndex : 3,
        harmonicity: 8
            },
        envelope : {
  	    attack : 0.5,
        decay : 0.1,
        sustain: 0.4,
        release: 4
           }
        })
    OSC.triggerAttackRelease(freqstart,20);
    OSC.connect(echo);
    echo.connect(volumes);
    volumes.toMaster();
  }
  // main part of the synth
  this.makenotes = function(){
  // frequency changes based on position of y 
     var freq;
  // randomly select two types of frequencies
     var freq1= tree.reachedleafy;
     if (freq1 <= 30){
      freq1 = random(40,100);
     }
     var freq2 = Tone.Frequency(freq1).transpose(4); // semitones;
     var freqC = floor(random(0,2));
     if (freqC ===0){
        freq = freq1;
     } else {
        freq = freq2;
     } 
  // instruments
     var sineSynth;
     var sineSynth1 = new Tone.Synth(
       {oscillator : {
  	   type : 'sine',
       modulationType : 'square',
       modulationIndex : 3,
       harmonicity: 3.4
                    },
       envelope : {
  	   attack : 0.5,
       decay : 0.1,
       sustain: 0.4,
       release: 6
                 }
       })

   var sineSynth2 = new Tone.Synth(
       {oscillator : {
  	   type : 'sine',
       modulationType : 'sine',
       modulationIndex : 3,
       harmonicity: 6
                     },
       envelope : {
  	   attack : 0.5,
       decay : 0.1,
       sustain: 0.4,
       release: 6
                  }
       })

     sineSynth1.triggerAttackRelease(freq,20);
     sineSynth2.triggerAttackRelease(freq,25);
   
   // randomly use two types of sine osc sources  
     var synthC = floor(random(0,2));
     if (synthC ===0){
        sineSynth = sineSynth1;
     } else {
       sineSynth = sineSynth2;
     }
  // set pan according to x value
     var leftPanner = new Tone.Panner( -0.5 );
     var rightPanner = new Tone.Panner( 0.5 );
     var panner = tree.reachedleafx;
     if (panner <= width/2){
       sineSynth.connect(leftPanner);
     } else{sineSynth.connect(rightPanner);}
  
   
     var echo2 = new Tone.FeedbackDelay( '6n', 0.7 );
     
     var reverb2 = new Tone.Freeverb();
     reverb2.dampening.value = 50;
     reverb2.roomSize .value = 0.4;
     
     var masterVolume = new Tone.Volume(-24);
     
     // connect everything
     leftPanner.connect(echo2);
     rightPanner.connect(echo2);
     //  connect reverb to the leaves that close to center
     if (tree.reachedleafx > 580 && tree.reachedleafx < 700){
       echo2.connect(reverb2);
       reverb2.connect(masterVolume)
     } else {
     echo2.connect(masterVolume);
     }
     //masterVolume.fadeOut = "4n";
     masterVolume.toMaster();
  }
  
}
