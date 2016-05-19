var Game = Class.extend({
	init: function(){
		this.time = 0;
		this.timeSplit = 0;
		this.isStartPopup = false;
//		 this.startDelay = 100; 	// 2min -> 2 * 60 * 1000
//		 this.questionDelay = 100;	// 2min -> 2 * 60 * 1000
		this.startDelay = 2*60*1000; 	
		this.questionDelay = 2*60*1000;	
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
                scrollEnabled = false;
		this.openedQuestions = 0;
		this.closedQuestions = 0;
		this.points = 0;
		this.isOpenQuestion = false;

		if(URLS.lang === 'en/'){
			this.questions = this.questionsEng;

			$('#game-intro .game-title').text('Welcome to RSU virtual exhibition game!');
			$('#game-intro .game-subtitle').text('Are you ready to take the challenge and test your knowledge about the history of RSU?');
			$('#game-intro .confirm').text('Yes');
			$('#game-intro .decline').text('No');

			$('#game-confirm-advanced .game-title').text('Great! Let’s start the game!');
			$('#game-confirm-advanced game-subtitle').text('Answer to 12 questions appearing on the screen. Get to know more about the virtual exhibition of RSU Museum and test your knowledge about the university and its history.');
			$('#game-confirm-advanced .confirm').text('OK');

			$('#game-confirm-basic .game-title').text('If you change your mind, go back to MENU.');
			$('#game-confirm-basic .confirm').text('OK');

			$('#game-cheers .confirm').text('OK');

			$('#game-over .game-title').text('RSU students would take their hats off to you, as you are a true RSU history expert!');
			$('#game-over .confirm').text('Replay the game');
		}

		this.isStartPopup = true;
                $('#game-container').css('display', 'block');
                $('#game-container').height(document.documentElement.clientHeight);
		$('#game-inner').css('display', 'block');
		$('#game-intro').css('display', 'block');
                $('.button-wrap .game-button').height(Math.ceil( $('.button-wrap .game-button').height()));
//                 $('.button-wrap .game-button').width(Math.floor( $('.button-wrap .game-button').width()));

//        if(isMobile) $('.game-content > div').height($('.game-content').height() - $('#masthead').height());
        $('#game-close').css('display', 'none');
        $('.game-button').css('line-height', $('.game-button').height()+"px");
		console.log("start popup");
	}
        
        

	, closeInstuctionPopup: function(){
		// TODO open first question popup
	}

	, openQuestionPopup: function(){
                scrollEnabled = false;
		this.isOpenQuestion = true;
		this.openedQuestions++;
		var question = this.questions[this.openedQuestions-1];
		this.closeAllPopups();
                $('#game-question #lg-counter').css('line-height', $('#lg-counter').height() + "px");
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
                $('#game-question .button-wrap .game-button').height(Math.ceil( $('#game-question .button-wrap .game-button').height()));
//                $('#game-question .button-wrap .game-button').width(Math.floor( $('#game-question .button-wrap .game-button').width()));
		$('#game-container').css('display', 'block');
                $('#game-container').height(document.documentElement.clientHeight);
		$('#game-inner').css('display', 'block');
		$('#game-question').css('display', 'block');
                $('#game-close').css('display', 'block');
                if (isMobile) $('#game-question .game-title').css('max-height', $('#game-question').height()-$('#game-question .button-wrap').outerHeight()-$('#game-question img').outerHeight()-5);

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
		}, 500);
	}

	, openCheers: function(isCorrect){
        scrollEnabled = false;
		var question = this.questions[this.openedQuestions-1];
		var text = isCorrect ? question.cheersTrue : question.cheersFalse;
		this.closeAllPopups();
                
        $('.game-button').height(Math.ceil( $('.game-button').height()));
//                $('.game-button').width(Math.floor( $('.game-button').width()));
		$('#game-cheers .game-title').html(text);
                $('#game-container').css('display', 'block');
                $('#game-container').height(document.documentElement.clientHeight);
		$('#game-inner').css('display', 'block');
		$('#game-cheers').css('display', 'block');
                $('#game-close').css('display', 'block');
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
        scrollEnabled = false;
		this.closeAllPopups();
        $('#game-container').css('display', 'block');
        $('#game-container').height(document.documentElement.clientHeight);
		$('#game-inner').css('display', 'block');
		$('#game-over').css('display', 'block');
        $('.game-button').height(Math.ceil( $('.game-button').height()));
//                $('.game-button').width(Math.floor( $('.game-button').width()));
	}

	, closeAllPopups: function(){
        $('#game-container').css('display', 'none');
		$('#game-inner').css('display', 'none');
		$('#game-intro').css('display', 'none');
		$('#game-confirm-basic').css('display', 'none');
		$('#game-confirm-advanced').css('display', 'none');
		$('#game-cheers').css('display', 'none');
		$('#game-over').css('display', 'none');
		$('#game-question').css('display', 'none');
                
        var item = dynamicContent.getItem();
        if (item.template !== 'templates/menu.php' || item.template !== 'templates/searchResults.php' || item.post_name !== 'kontakti' || item.post_name !== 'contacts')
        scrollEnabled = true;	
	}

	, addEventListeners: function(){
		var self = this;
		// ############ popup close button
		$('#game-close').bind('click', function() {
		 	self.closeAllPopups();
                        $('#game-container').css('display', 'block');
			$('#game-inner').css('display', 'block');
			$('#game-confirm-basic').css('display', 'block');
                        $('#game-close').css('display', 'none');
		});

		// ############ start popup
		$('#game-intro .confirm').bind('click', function(){
			self.closeAllPopups();
                        $('#game-container').css('display', 'block');
			$('#game-inner').css('display', 'block');
			$('#game-confirm-advanced').css('display', 'block');
		});

		$('#game-intro .decline').bind('click', function(){
			self.closeAllPopups();
                        $('#game-container').css('display', 'block');
			$('#game-inner').css('display', 'block');
			$('#game-confirm-basic').css('display', 'block');
                        $('#game-close').css('display', 'none');
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
                
                function DraugiemSay( title, url, titlePrefix ){
                 window.open(
                  'http://www.draugiem.lv/say/ext/add.php?title=' + encodeURIComponent( title ) +
                  '&link=' + encodeURIComponent( url ) +
                  ( titlePrefix ? '&titlePrefix=' + encodeURIComponent( titlePrefix ) : '' ),
                  '',
                  'location=1,status=1,scrollbars=0,resizable=0,width=530,height=400'
                 );
                 return false; 
                }


                
                // FACEBOOK
                $('#game-over .social .facebook').on('click', function(){
                    var socPrefillText;
                    if (URLS.lang === "en/"){
                        if (game.points <=12)
                            socPrefillText = "I am a true RSU history expert. Test your knowledge of RSU history and development";
                        if (game.points <=8)
                            socPrefillText = "I am a true RSU history buff. Test your knowledge of RSU history and development.";
                        if (game.points <= 4) 
                            socPrefillText = "I am a true RSU history enthusiast. Test your knowledge of RSU history and development.";    
                    }
                    else{                        
                        if (game.points <=12)
                            socPrefillText = "Esmu īsts RSU vēstures eksperts! Noskaidro savas zināšanas par RSU vēsturi un attīstību arī Tu";
                        if (game.points <=8)
                            socPrefillText = "Esmu RSU vēstures lietpratējs! Noskaidro savas zināšanas par RSU vēsturi un attīstību arī Tu.";
                        if (game.points <= 4) 
                            socPrefillText = "Esmu īstens RSU vēstures entuziasts! Noskaidro savas zināšanas par RSU vēsturi un attīstību arī Tu.";
                    }
                    FB.ui({
                      method: 'share',
                      quote: socPrefillText,
            //          mobile_iframe: true,
                      href:  window.location.origin
                    }, function(response){});})
                // DRAUGIEM
                $('#game-over .social .draugiem').on('click', function(){
                    var socPrefillText;
                    if (URLS.lang === "en/"){
                        if (game.points <=12)
                            socPrefillText = "I am a true RSU history expert. Test your knowledge of RSU history and development";
                        if (game.points <=8)
                            socPrefillText = "I am a true RSU history buff. Test your knowledge of RSU history and development.";
                        if (game.points <= 4) 
                            socPrefillText = "I am a true RSU history enthusiast. Test your knowledge of RSU history and development.";    
                    }
                    else{                        
                        if (game.points <=12)
                            socPrefillText = "Esmu īsts RSU vēstures eksperts! Noskaidro savas zināšanas par RSU vēsturi un attīstību arī Tu";
                        if (game.points <=8)
                            socPrefillText = "Esmu RSU vēstures lietpratējs! Noskaidro savas zināšanas par RSU vēsturi un attīstību arī Tu.";
                        if (game.points <= 4) 
                            socPrefillText = "Esmu īstens RSU vēstures entuziasts! Noskaidro savas zināšanas par RSU vēsturi un attīstību arī Tu.";
                    }
                    DraugiemSay(socPrefillText,  window.location.origin, null);
                }); 
//                // GOOGLE+
//                $('#game-over .social .gplus').on('click', function(){
//                    $(this).data('prefilltext', $socPrefillText);
//                    $(this).data('contenturl', window.location.origin);
//                    $(this).data('calltoactionurl',  window.location.href);
//                    $(this).attr('data-prefilltext', $socPrefillText);
//                    $(this).attr('data-contenturl', window.location.origin);
//                    $(this).attr('data-calltoactionurl',  window.location.href);
//                }); 
                // TWITTER
                $('#game-over .social .twitter').on('click', function(){
                    var socPrefillText;
                    if (URLS.lang === "en/"){
                        if (game.points <=12)
                            socPrefillText = "I am a true RSU history expert. Test your knowledge of RSU history and development";
                        if (game.points <=8)
                            socPrefillText = "I am a true RSU history buff. Test your knowledge of RSU history and development.";
                        if (game.points <= 4) 
                            socPrefillText = "I am a true RSU history enthusiast. Test your knowledge of RSU history and development.";    
                    }
                    else{                        
                        if (game.points <=12)
                            socPrefillText = "Esmu īsts RSU vēstures eksperts! Noskaidro savas zināšanas par RSU vēsturi un attīstību arī Tu";
                        if (game.points <=8)
                            socPrefillText = "Esmu RSU vēstures lietpratējs! Noskaidro savas zināšanas par RSU vēsturi un attīstību arī Tu.";
                        if (game.points <= 4) 
                            socPrefillText = "Esmu īstens RSU vēstures entuziasts! Noskaidro savas zināšanas par RSU vēsturi un attīstību arī Tu.";
                    }
                    var title = encodeURI(socPrefillText);
                    var twitUrl = encodeURIComponent(window.location.origin);
                    $(this).attr('href', "https://twitter.com/intent/tweet" + "?text=" + title + "&url=" + twitUrl);
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


/* ################## GAME CONFIG ENG ################### */
game.questionsEng = [
	{
		question: 'Name two currently dominating study directions at Rīga Stradiņš University'
		, hint: ''
		, correctAnswer: 0
		, answers: [
			'Health care and social sciences'
			, 'Social sciences and medicine'
			, 'Biomedicine and health care'
			, 'Health care and European studies'
		]
		, cheersTrue: 'It is only the first step, but you have already shown yourself from your best side. Stay on track.'
		, cheersFalse: 'Unfortunately, you are wrong. But do not worry – mistakes are a part of being human.'
	}

	, {
		question: 'What was the initial name of Rīga Stradiņš University?'
		, hint: ''
		, correctAnswer: 1
		, answers: [
			'Medical Institute of Latvia'
			, 'Rīga Medical Institute'
			, 'State University of Latvia'
			, 'Institution of higher education of Latvia'
		]
		, cheersTrue: 'Knowledge or a lucky guess? You are right!'
		, cheersFalse: 'Oops! Wrong choice. Good luck for the next question.'
	}

	, {
		question: 'Which three colours symbolising life, hope and death are there on the first version of the flag of Rīga Medical Institute (designed in 1989 and has not been preserved until nowadays). On the black and white image – obverse of the flag'
		, hint: ''
		, correctAnswer: 0
		, img: 'RSU_WEB_SPELE-24.png'
		, answers: [
			'Dark red, white, black'
			, 'Dark red, white, yellow'
			, 'Dark blue, grey, red'
			, 'Dark grey, red, black'
		]
		, cheersTrue: 'Your intuition is right – you have picked the correct answer.'
		, cheersFalse: 'Your intuition failed you. Good luck for the next question.'
	}

	, {
		question: 'Name this person (pictured). He is an internationally renowned scholar in physics.'
		, hint: ''
		, correctAnswer: 2
		, img: 'RSU_WEB_SPELE-25.png'
		, answers: [
			'Prof. Jānis Stradiņš'
			, 'Kārlis Stradiņš'
			, 'Prof. Pauls Stradiņš'
			, 'Assoc. prof. Pēteris Stradiņš'
		]
		, cheersTrue: 'You are a smarty! Good luck for the next question!'
		, cheersFalse: 'Wrong answer. But do not get upset – you cannot know everything.'
	}

	, {
		question: 'Which profession had to be acquired by men at Rīga Medical Institute so that they could hold the rank of an officer and avoid compulsory military service in the Soviet Army.'
		, hint: ''
		, correctAnswer: 1
		, answers: [
			'Nurse'
			, 'Doctor'
			, 'Doctor’s assistant'
			, 'Military doctor'
		]
		, cheersTrue: 'Great, you are right! Stay witty!'
		, cheersFalse: 'You are losing your wits! Stay tuned!'
	}

	, {
		question: 'Which position at Rīga Medical Institute was taken by Professor Ernests Burtnieks (pictured)?'
		, hint: ''
		, correctAnswer: 3
		, img: 'RSU_WEB_SPELE-26.png'
		, answers: [
			'The first dean of the Faculty of Medicine'
			, 'Long-standing rector of RMI'
			, 'Head of the Department of Health'
			, 'The first director of RMI'
		]
		, cheersTrue: 'You picked the right answer as a true professional. Good luck for the next question!'
		, cheersFalse: 'This time you are wrong. Show what you know when answering the next question.'
	}

	, {
		question: 'Since 1976, RSU has been hosting students’ surgery olympiad (trophy of the olympiad pictured). Name the title of this olympiad.'
		, hint: ''
		, correctAnswer: 0
		, img: 'RSU_WEB_SPELE-27.png'
		, answers: [
			'“Golden Scalpel”'
			, '“The Sharp Scalpel”'
			, '“Golden Stethoscope”'
			, '“RSU Scalpel”'
		]
		, cheersTrue: 'Good job – everything is correct! Good luck for the next question!'
		, cheersFalse: 'You have picked a wrong answer. Good luck for the next question!'
	}

	, {
		question: 'What is the name of RSU sports and recreation centre?'
		, hint: ''
		, correctAnswer: 1
		, answers: [
			'„Vecpiebalga”'
			, '„Taurene”'
			, '“Taurenis”'
			, '“RSU Sports”'
		]
		, cheersTrue: 'It seems that you are an RSU graduate ... Your answer is 100% correct.'
		, cheersFalse: 'Unfortunately, you are wrong. Good luck for the next question!'
	}

	, {
		question: 'In 1951, a mixed choir was established at Rīga Medical Institue. Nowadays the choir has become one of the brands of Rīga Stradiņš University. What is the name of the choir? '
		, hint: ''
		, correctAnswer: 0
		, answers: [
			'„Rīga” (“Riga”)'
			, '„Latvija” (“Latvia”)'
			, '„Tēvzeme” (“Fatherland”)'
			, '„Ačkups”'
		]
		, cheersTrue: 'Your knowledge did not let you down. Stay on track.'
		, cheersFalse: 'Unfortunately, you are wrong, but everything is not lost.'
	}

	, {
		question: 'Name the annual video quiz organised from 1987 to 1993? Pictured – symbol of the quiz.'
		, hint: ''
		, correctAnswer: 0
		, img: 'RSU_WEB_SPELE-28.png'
		, answers: [
			'„Trivium”'
			, '„Taurenis” (“Butterfly”)'
			, '„Viktorim”'
			, '„Zelta stetoskops” (“Golden Stethoscope”)'
		]
		, cheersTrue: 'You have scored!'
		, cheersFalse: 'You are wrong, but the question was a tough one.'
	}

	, {
		question: 'Name an organisation established at Rīga Medical Institute that promoted cooperation with the socialist countries during the Cold War.'
		, hint: ''
		, correctAnswer: 0
		, answers: [
			'“Interklubs”'
			, '“Studenti par mieru” (“Students for Peace”)'
			, '“SZB Ateisma nodaļa” (“SSA Atheism Department”)'
			, '“Interclub”'
		]
		, cheersTrue: 'Correct! Good luck for the last question!'
		, cheersFalse: 'You are absolutely ... wrong. You will succeed with the next question.'
	}

	, {
		question: 'Name the year of the introduction of social sciences study programmes at the institution (now Rīga Stradiņš University)?'
		, hint: ''
		, correctAnswer: 2
		, answers: [
			'in 1950'
			, 'in 1990'
			, 'in 1998'
			, 'in 2002'
		]
		, cheersTrue: 'Congratulations! You have finished the game with a correct answer.'
		, cheersFalse: 'Unfortunately, you are wrong. But you have stood firm just like a real RSU student!'
	}
];