var Game = Class.extend({
	init: function(){
		this.time = 0;
		this.timeSplit = 0;
		this.isStartPopup = false;
		this.startDelay = 1000;
		this.questionDelay = 2000;
		this.openedQuestions = 0;
		this.closedQuestions = 0;
		this.isOpenQuestion = false;
		this.lastOpenTime = 0;
		this.questions = []; 
		this.points = 0;

		this.addEventListeners();
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
		if(!this.isStartPopup && this.time >= this.startDelay){
			this.startPopup();			
		}
		
		if(this.openedQuestions !== 0 
			&& this.openedQuestions < this.questions.length 
			&& this.openedQuestions === this.closedQuestions 
			&& !this.isOpenQuestion)
		{
			if(this.lastOpenTime + this.questionDelay < this.time){
				this.openQuestionPopup();
			}
		}

	}

	, startPopup: function(){
		this.closeAllPopups();
		this.openedQuestions = 0;
		this.closedQuestions = 0;
		this.points = 0;
		this.isOpenQuestion = false;

		this.isStartPopup = true;
		$('#game-inner').css('display', 'block');
		$('#game-intro').css('display', 'block');
		console.log("start popup");
	}

	, closeInstuctionPopup: function(){
		// TODO open first question popup
	}

	, openQuestionPopup: function(){
		this.isOpenQuestion = true;
		this.openedQuestions++;
		var question = this.questions[this.openedQuestions-1];
		this.closeAllPopups();

		$('#game-question #lg-counter-current').text(this.openedQuestions);
		$('#game-question #lg-counter-all').text(this.questions.length);
		$('#game-question .game-title').html(question.question);
		if(question.img){
			$('#game-question img').attr('src', URLS.site+'wp-content/themes/the-box-child/images/game/'+question.img);	
			$('#game-question').addClass('imageQuest');
		} else {
			$('#game-question img').attr('src', "");
			$('#game-question').removeClass('imageQuest');
		}
		var buttons = '';
		for(var i=0; i<question.answers.length; i++) buttons += '<div class="game-button gray">'+question.answers[i]+'</div>';
		$('#game-question .button-wrap').html(buttons);

		
		$('#game-inner').css('display', 'block');
		$('#game-question').css('display', 'block');

		// TODO open question
		// console.log("question "+(this.openedQuestions-1));


	}

	, answerQuestion: function(answerID){
		var question = this.questions[this.openedQuestions-1];
		if(question.correctAnswer === answerID){
			this.points++;
			question.isCorrect = true;
		} else {
			question.isCorrect = false;
			var buttonPointer = $('#game-question .button-wrap').children().eq(answerID);
			buttonPointer.removeClass('gray');
			buttonPointer.addClass('wrong');
		}
		var buttonPointer = $('#game-question .button-wrap').children().eq(question.correctAnswer);
		buttonPointer.removeClass('gray');
		buttonPointer.addClass('right');

		// console.log('anwer', question.correctAnswer, answerID);

		var self = this;
		setTimeout(function(){
			self.openCheers(question.isCorrect);
		}, 1000);
	}

	, openCheers: function(isCorrect){
		var question = this.questions[this.openedQuestions-1];
		var text = isCorrect ? question.cheersTrue : question.cheersFalse;
		this.closeAllPopups();
		$('#game-cheers .game-title').html(text);
		$('#game-inner').css('display', 'block');
		$('#game-cheers').css('display', 'block');

	}

	, closeQuestion: function(isCorrect){
		this.closedQuestions = this.openedQuestions;
		this.isOpenQuestion = false;
		this.lastOpenTime = this.time;
		this.closeAllPopups();

		if(this.closedQuestions === this.questions.length){
			this.showResults();
		}
	}

	, showResults: function(){
		this.closeAllPopups();
		$('#game-inner').css('display', 'block');
		$('#game-over').css('display', 'block');
	}

	, closeAllPopups: function(){
		$('#game-inner').css('display', 'none');
		$('#game-intro').css('display', 'none');
		$('#game-confirm-basic').css('display', 'none');
		$('#game-confirm-advanced').css('display', 'none');
		$('#game-cheers').css('display', 'none');
		$('#game-over').css('display', 'none');
		$('#game-question').css('display', 'none');
	}

	, addEventListeners: function(){
		var self = this;
		// ############ popup close button
		$('#game-close').bind('click', function() {
		 	self.closeAllPopups();
		});

		// ############ start popup
		$('#game-intro .confirm').bind('click', function(){
			self.closeAllPopups();
			$('#game-inner').css('display', 'block');
			$('#game-confirm-advanced').css('display', 'block');
		});

		$('#game-intro .decline').bind('click', function(){
			self.closeAllPopups();
			$('#game-inner').css('display', 'block');
			$('#game-confirm-basic').css('display', 'block');
		});

		// ############ instruction popup
		$('#game-confirm-advanced .confirm').bind('click', function(){
			self.closeAllPopups();
			self.openQuestionPopup();
		});

		// ############ instruction to reopen game
		$('#game-confirm-basic').bind('click', function(){
			self.closeAllPopups();
		});

		// ############ game question buttons
		$('#game-question .button-wrap').bind('click', function(e){
			var pointer = $(e.target)
			if(pointer.hasClass('game-button')){
				self.answerQuestion(pointer.index());
			}
		});

		// ############ game cheers popup close
		$('#game-cheers .game-button').bind('click', function(e){
			self.closeQuestion();
		});

		// ############ game over repeat game
		$('#game-over .game-button').bind('click', function(e){
			self.startPopup();
		});
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
		question: 'Kādi ir divi mūsdienās <em>Rīgas Stradiņa universitātē dominējošie studiju virzieni?</em>'
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
		question: 'Kāds ir <em>Rīgas Stradiņa universitātes pirmais nosaukums?</em>'
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
		question: '<em>Kādas trīs dzīvību, cerību un nāvi simbolizējošas krāsas tika iekļautas pirmā Rīgas Medicīnas institūta karoga dizainā</em> (izveidots 1989. gadā un līdz mūsdienām nav saglabājies)? Melnbaltajā attēlā redzama karoga labā puse.'
		, hint: 'Atbilde meklējama sadaļas “Attīstība, rektori un Stradiņa vārds” apakšsadaļā “Rīgas Medicīnas institūts” (9. turpinājums)'
		, correctAnswer: 0
		, img: 'RSU_WEB_SPELE-24.png'
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
		question: '<em>Kā sauc šo personu</em> (attēlā), kas ir kļuvis par starptautiski ievērojamu zinātnieku fizikā?'
		, hint: 'Atbilde meklējama sadaļas “Attīstība, rektori un Stradiņa vārds” apakšsadaļā “Rīgas Stradiņa universitāte” (“Stradiņa vārds augstskolai”) (6. turpinājums)'
		, correctAnswer: 2
		, img: 'RSU_WEB_SPELE-25.png'
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
		question: '<em>Par ko vīriešiem bija jāmācās Rīgas Medicīnas institūtā</em>, lai institūts tiktu pabeigts ar virsnieka pakāpi bez obligātās karaklausības pildīšanas Padomju armijā?'
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
		question: 'Kādu amatu Rīgas Medicīnas institūtā ieņēma <em>profesors Ernests Burtnieks (attēlā)?</em>'
		, hint: 'Atbilde meklējama sadaļas “Attīstība, rektori un Stradiņa vārds” apakšsadaļā “Rektori” (6. turpinājums)'
		, correctAnswer: 3
		, img: 'RSU_WEB_SPELE-26.png'
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
		question: 'Rīgas Stradiņa universitātē no 1976. gada noris <em>studentu ķirurģijas olimpiāde</em> (tās apbalvojums attēlā). <em>Kā sauc šo olimpiādi?</em>'
		, hint: 'Atbilde meklējama sadaļas “Zinātne un pedagoģija” apakšsadaļā “Pedagoģija” (6. turpinājums)'
		, correctAnswer: 0
		, img: 'RSU_WEB_SPELE-27.png'
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
		question: 'Kā sauc <em>RSU sporta un atpūtas bāzi</em> Vecpiebalgas novadā?'
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
		question: '1951. gadā <em>Rīgas Medicīnas institūtā izveidoja jaukto kori</em>, kas ir arī viens no mūsdienās atpazīstamākajiem Rīgas Stradiņa universitātes zīmoliem. Kāds ir šī kora nosaukums? '
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
		question: 'Kāds bija no 1987. līdz 1993. gadam augstskolā organizētas <em>ikgadējās gudrības, atjautības un jautrības video viktorīnas</em> nosaukums? Attēlā redzams viktorīnas simbols.'
		, hint: 'Atbilde meklējama sadaļas “Ārpus studijām” apakšsadaļā “Studentu sabiedriskās aktivitātes” (1. turpinājums)'
		, correctAnswer: 0
		, img: 'RSU_WEB_SPELE-28.png'
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
		question: 'Kā sauc Rīgas Medicīnas institūta veidotu organizāciju, kas <em>aukstā kara laikā veicināja sadarbību ar sociālisma bloka valstīm?</em>'
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
		question: 'Kad augstskolā (tagad Rīgas Stradiņa universitātē) tika <em>ieviestas sociālo zinātņu studiju programmas?</em>'
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