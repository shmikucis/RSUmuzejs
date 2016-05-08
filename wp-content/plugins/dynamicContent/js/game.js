var Game = Class.extend({
	init: function(){
		this.time = 0;
		this.timeSplit = 0;
		this.startDelay = 1000;
		this.questionDelay = 2000;
		this.openedQuestions = 0;
		this.closedQuestions = 0;
		this.isOpenQuestion = false;
		this.lastOpenTime = 0;
		this.questions = []; 
		this.points = 0;
	}

	, update: function(){
		if(this.timeSplit === 0) this.timeSplit = new Date().getTime();
		var newTime = new Date().getTime();
		var deltaTime = newTime - this.timeSplit;
		this.timeSplit = newTime;
		if(deltaTime > 1000){
			// if loop was on sleep (tab switched)
			return;
		}

		this.time += deltaTime;		

		// first question opens
		if(this.openedQuestions === 0 && this.time >= this.startDelay){
			this.openedQuestions = 1;
			// TODO open start question
			console.log("start popup");
		}
		else if(this.openedQuestions === this.closedQuestions && !this.isOpenQuestion){
			if(this.lastOpenTime + this.questionDelay < this.time){
				this.isOpenQuestion = true;
				this.openedQuestions++;
				// TODO open question
				console.log("question "+(this.openedQuestions-1));
			}
		}

	}

	, closeStartPopup: function(doContinue){
		if(doContinue){
			// TODO open instuction popup
		} else {
			// TODO instruct how to reopen game
		}
	}

	, closeInstuctionPopup: function(){
		// TODO open first question popup
	}

	, openQuestionPopup: function(){

	}

	, answerQuestion: function(answerID){
		var question = this.questions[this.openedQuestions-1];
		if(question.correctAnswer === answerID){
			this.points++;
			question.isCorrect = true;
		} else {
			question.isCorrect = false;
		}

		// TODO show correct and incorrect answer

		var self = this;
		setTimeout(function(){
			self.closeQuestion();
		}, 1000);
	}

	, closeQuestion: function(){
		this.closedQuestions = this.openedQuestions;
		this.isOpenQuestion = false;
		this.lastOpenTime = this.time;
		if(this.closedQuestions === this.questions.length){
			this.showResults();
		}
	}

	, showResults: function(){

	}
})



/* ######## init game and game loop ########## */
var game = new Game();

function gameUpdate(){
	game.update();
	requestAnimationFrame(gameUpdate);
}
requestAnimationFrame(gameUpdate);






/* ################## GAME CONFIG ################### */
game.questions = [
	{
		question: 'Kādi ir divi mūsdienās Rīgas Stradiņa universitātē dominējošie studiju virzieni?'
		, hint: 'Atbilde meklējama sadaļā "Studiju virzienu pirmsākumi"'
		, correctAnswer: 0
		, answers: [
			'Veselības aprūpe un sociālās zinātnes'
			, 'Sociālās zinātnes un medicīna'
			, 'Biomedicīna un veselības aprūpe'
			, 'Veselības aprūpe un Eiropas studijas'
		]
		, cheersTrue: 'Tikai pirmais jautājums, bet jau esi parādījis sevi no labākās puses! Tā turpināt!'
		, cheersFalse: 'Diemžēl atbilde nav pareiza. Bet nekas – kļūdīties ir cilvēcīgi!'
	}

	, {
		question: 'Kāds ir Rīgas Stradiņa universitātes pirmais nosaukums?'
		, hint: 'Atbilde meklējama sadaļā “Attīstība, rektori un Stradiņa vārds”'
		, correctAnswer: 1
		, answers: [
			'Latvijas Medicīnas institūts'
			, 'Rīgas Medicīnas institūts '
			, 'Latvijas Valsts universitāte'
			, 'Latvijas Augstskola'
		]
		, cheersTrue: 'Nav zināms, vai palīdzēja erudīcija vai veiksme, taču esi atbildējis pareizi!'
		, cheersFalse: 'Ups – atbilde nepareiza. Lai veicas nākamajos jautājumos!'
	}

	, {
		question: 'Kādas trīs dzīvību, cerību un nāvi simbolizējošas krāsas tika iekļautas pirmā Rīgas Medicīnas institūta karoga dizainā (izveidots 1989. gadā un līdz mūsdienām nav saglabājies)? Melnbaltajā attēlā redzama karoga labā puse.'
		, hint: 'Atbilde meklējama sadaļas “Attīstība, rektori un Stradiņa vārds” apakšsadaļā “Rīgas Medicīnas institūts” (9. turpinājums)'
		, correctAnswer: 0
		, answers: [
			'Tumši sarkana, balta, melna'
			, 'Tumši sarkana, balta, dzeltena'
			, 'Tumši zila, pelēka, sarkana'
			, 'Tumši pelēka, sarkana, melna'
		]
		, cheersTrue: 'Priekšnojauta nebūs melojusi – esi atbildējis pareizi!'
		, cheersFalse: 'Priekšnojauta šoreiz būs melojusi. Lai izdodas nākamajā jautājumā!'
	}

	, {
		question: 'Kā sauc šo personu (attēlā), kas ir kļuvis par starptautiski ievērojamu zinātnieku fizikā?'
		, hint: 'Atbilde meklējama sadaļas “Attīstība, rektori un Stradiņa vārds” apakšsadaļā “Rīgas Stradiņa universitāte” (“Stradiņa vārds augstskolai”) (6. turpinājums)'
		, correctAnswer: 2
		, answers: [
			'Prof. Jānis Stradiņš'
			, 'Kārlis Stradiņš'
			, 'Prof. Pauls Stradiņš'
			, 'Asoc. prof. Pēteris Stradiņš'
		]
		, cheersTrue: 'Tu nu gan esi gudrinieks! Veiksmi arī nākamajos jautājumos!'
		, cheersFalse: 'Atbilde nepareiza. Bet visu jau arī nevar zināt…'
	}

	, {
		question: 'Par ko vīriešiem bija jāmācās Rīgas Medicīnas institūtā, lai institūts tiktu pabeigts ar virsnieka pakāpi bez obligātās karaklausības pildīšanas Padomju armijā?'
		, hint: 'Atbilde meklējama sadaļas “Attīstība, rektori un Stradiņa vārds” apakšsadaļā “Rīgas Medicīnas institūts” (6. turpinājums)'
		, correctAnswer: 1
		, answers: [
			'Medmāsām'
			, 'Ārstiem'
			, 'Ārsta palīgiem'
			, 'Kara ārstiem'
		]
		, cheersTrue: 'Lieliski – atbilde pareiza. Ja nezaudēsi asumu, iegūsi eksperta titulu!'
		, cheersFalse: 'Tu zaudē asumu. Gan atbildēsi pareizi uz nākamo jautājumu!'
	}

	, {
		question: 'Kādu amatu Rīgas Medicīnas institūtā ieņēma profesors Ernests Burtnieks (attēlā)?'
		, hint: 'Atbilde meklējama sadaļas “Attīstība, rektori un Stradiņa vārds” apakšsadaļā “Rektori” (6. turpinājums)'
		, correctAnswer: 3
		, answers: [
			'Pirmais Medicīnas fakultātes dekāns'
			, 'Ilggadējs RMI rektors'
			, 'Veselības katedras vadītājs'
			, 'Pirmais RMI direktors'
		]
		, cheersTrue: 'Tu izvēlējies atbildi kā īsts profesionālis. Lai veicas arī nākamajā jautājumā!'
		, cheersFalse: 'Šoreiz atbildēji nepareizi. Parādi, ko zini, nākamajā jautājumā!'
	}

	, {
		question: 'Rīgas Stradiņa universitātē no 1976. gada noris studentu ķirurģijas olimpiāde (tās apbalvojums attēlā). Kā sauc šo olimpiādi?'
		, hint: 'Atbilde meklējama sadaļas “Zinātne un pedagoģija” apakšsadaļā “Pedagoģija” (6. turpinājums)'
		, correctAnswer: 0
		, answers: [
			'„Zelta skalpelis”'
			, '„Asais skalpelis”'
			, '„Zelta stetoskops”'
			, '„RSU skalpelis”'
		]
		, cheersTrue: 'Malacis – viss pareizi! Lai veicas arī nākamajos jautājumos!'
		, cheersFalse: 'Tu izvēlējies nepareizo atbildi. Vēlam veiksmi nākamajā jautājumā!'
	}

	, {
		question: 'Kā sauc RSU sporta un atpūtas bāzi Vecpiebalgas novadā?'
		, hint: 'Kā sauc RSU sporta un atpūtas bāzi Vecpiebalgas novadā?'
		, correctAnswer: 1
		, answers: [
			'„Vecpiebalga”'
			, '„Taurene”'
			, '“Taurenis”'
			, '“RSU Sports”'
		]
		, cheersTrue: 'Izskatās, ka esi studējis RSU… Atbilde 100 % pareiza!'
		, cheersFalse: 'Pārliecinoši, bet diemžēl nepareizi. Lai izdodas nākamajā jautājumā!'
	}

	, {
		question: '1951. gadā Rīgas Medicīnas institūtā izveidoja jaukto kori, kas ir arī viens no mūsdienās atpazīstamākajiem Rīgas Stradiņa universitātes zīmoliem. Kāds ir šī kora nosaukums? '
		, hint: 'Atbilde meklējama sadaļas “Ārpus studijām” apakšsadaļā “Mākslinieciskie kolektīvi” (1. turpinājums)'
		, correctAnswer: 0
		, answers: [
			'„Rīga”'
			, '„Latvija”'
			, '„Tēvzeme”'
			, '„Ačkups”'
		]
		, cheersTrue: 'Tavas zināšanas Tev neliek vilties! Tā turpināt!'
		, cheersFalse: 'Diemžēl esi kļūdījies. Taču viss vēl nav zaudēts!'
	}

	, {
		question: 'Kāds bija no 1987. līdz 1993. gadam augstskolā organizētas ikgadējās gudrības, atjautības un jautrības video viktorīnas nosaukums? Attēlā redzams viktorīnas simbols.'
		, hint: 'Atbilde meklējama sadaļas “Ārpus studijām” apakšsadaļā “Studentu sabiedriskās aktivitātes” (1. turpinājums)'
		, correctAnswer: 0
		, answers: [
			'„Trivium”'
			, '„Taurenis”'
			, '„Viktorim”'
			, '„Zelta stetoskops”'
		]
		, cheersTrue: 'Ar desmito atbildi esi trāpījis desmitniekā! '
		, cheersFalse: 'Tu kļūdījies, taču arī jautājums nebija no vieglajiem. Veiksmi turpmāk!'
	}

	, {
		question: 'Kā sauc Rīgas Medicīnas institūta veidotu organizāciju, kas aukstā kara laikā veicināja sadarbību ar sociālisma bloka valstīm?'
		, hint: 'Atbilde meklējama sadaļas “Ārpus studijām” apakšsadaļā “Studentu sabiedriskā aktivitātes” (2. turpinājums)'
		, correctAnswer: 0
		, answers: [
			'“Interklubs”'
			, '“Studenti par mieru”'
			, '“SZB Ateisma nodaļa”'
			, '“Interclub”'
		]
		, cheersTrue: 'Pareizāk par pareizu! Lai izdodas pareizi atbildēt arī uz pēdējo jautājumu!'
		, cheersFalse: 'Pilnīgi… nepareizi! Taču nākamā atbilde Tev noteikti būs pa spēkam!'
	}

	, {
		question: 'Kad augstskolā (tagad Rīgas Stradiņa universitātē) tika ieviestas sociālo zinātņu studiju programmas?'
		, hint: 'Atbilde meklējama sadaļas “Augstskolas struktūra” (2. turpinājums)'
		, correctAnswer: 2
		, answers: [
			'1950. gadā'
			, '1990. gadā'
			, '1998. gadā'
			, '2002. gadā'
		]
		, cheersTrue: 'Apsveicam – Tu spēli noslēdz ar pareizo atbildi!'
		, cheersFalse: 'Atbilde diemžēl nepareiza! Taču malacis – Tu turējies kā īsts RSU students!'
	}
];