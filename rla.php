<?

$mlLaughs = array( "2HystericalLaughings.wav","EndLaughOne.wav","EndLaughThree.wav","EndLaughTwo.wav","GroupLaughOne.wav","GroupLaughTwo.wav","GroupLaughingChrisProminent.wav","ChrisForcedLaughter.wav","ChrishahahahaLaugh.wav","ChrishahahaOhMyGawd.wav","ChrismediumLaughhahas.wav","ChrisPffffOMGThisisFunny.wav","ChrisppppphahahaOhMyGawd.wav","ChrisBordenrepetitivehahas.wav","ChrisBordenslowBuild.wav","ChrisSnickering.wav","louPreciousLaughTwo.wav","louPreciousLaughOne.wav","louHystericalLaughter.wav","louHLaughLight.wav","louGutteralLaughHold.wav","KeiraJadeUnwantedTickleLaugh.wav","KeiraJadeGiggleandSqueal.wav","KeiraJadeBabyLaugh.wav","ChrisWoohoohoo.wav","ChristhhhhOhMyGawd.wav","ChrisSoloLaughsOne.wav","ChrisSnorting.wav");
$myrandomlaugh = $mylaughs[mt_rand(0, count($mylaughs) -1)];
include ($myrandomlaugh);

$response = new Services_Twilio_Twiml();
$response->say('Hello, thank you for calling Laugh Institute\'s Random Laugh Access Machine. We will now play a rondom laugh just for you.' );
$response->play("http://laughinstitute.org/rla/rla.php". array_rand($mlLaughs));
$response->say('Thank you for calling us at Laugh Institute. Have a pleasant day!');
$response->hang-up();
print $response;

?>
