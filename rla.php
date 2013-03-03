<!-- <html>
<head>
<title>[: Random Laugh hawtLine powered by Laugh Institute :]</title>
</head>
<body>
  <?php

// Download/Install the PHP helper library from twilio.com/docs/libraries.
// This line loads the library
require('path/to/twilio-php/Services/Twilio.php');
 
// Your Account Sid and Auth Token from twilio.com/user/account
$sid = "AC32a3c49700934481addd5ce1659f04d2"; 
$token = "b32287b15bc876d3aeb8baf369f0775c"; 
$client = new Services_Twilio($sid, $token);
    
    $mylaughs = array( "2HystericalLaughings.wav","EndLaughOne.wav","EndLaughThree.wav","EndLaughTwo.wav","GroupLaughOne.wav","GroupLaughTwo.wav","GroupLaughingChrisProminent.wav","ChrisForcedLaughter.wav","ChrishahahahaLaugh.wav","ChrishahahaOhMyGawd.wav","ChrismediumLaughhahas.wav","ChrisPffffOMGThisisFunny.wav","ChrisppppphahahaOhMyGawd.wav","ChrisBordenrepetitivehahas.wav","ChrisBordenslowBuild.wav","ChrisSnickering.wav","louPreciousLaughTwo.wav","louPreciousLaughOne.wav","louHystericalLaughter.wav","louHLaughLight.wav","louGutteralLaughHold.wav","KeiraJadeUnwantedTickleLaugh.wav","KeiraJadeGiggleandSqueal.wav","KeiraJadeBabyLaugh.wav","ChrisWoohoohoo.wav","ChristhhhhOhMyGawd.wav","ChrisSoloLaughsOne.wav","ChrisSnorting.wav");
    $myrandomlaugh = $mylaughs[mt_rand(0, count($mylaughs) -1)];
    include ($myrandomlaugh);
    
    $response = new Services_Twilio_Twiml();
    /* $response->say('Hello, thank you for calling Laugh Institute\'s Random Laugh Access Machine. We will now play a rondom laugh just for you. Hold for just a second, please, while we access a laugh for you.' ); */
    $response->play("http://laughinstitute.org/rla/". array_rand($mylaughs));
    /* $response->say('Thank you for calling us at Laugh Institute. Have a pleasant day!');
    $response->hang-up(); */
    print $response;
    
    ?>
</body>
</html> -->
