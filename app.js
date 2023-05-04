function Actor(id, characterName, actorName, pictureURL, yearOfBirth) {
	this.id = id;
	this.characterName = characterName;
	this.actorName = actorName;
	this.pictureURL = pictureURL;
	this.yearOfBirth = yearOfBirth;
	this._hasIdOrName = Boolean(this.id || this.actorName)
};

Actor.prototype.getRow = function() {
	return `<tr>
	<td>${this.id}</td><td>${this.actorName}</td>
	<td>${this.characterName}</td>
	<td>${this.yearOfBirth}</td>
	<td><img src="${this.pictureURL}"></img></td>
	<td>
		<span>
			<a class="remove" href="#">Remove</a>
		</span>
	</td>
	</tr>`;
};

Actor.prototype.toString = function() {
	if(this._hasIdOrName) {
		return this.actorName + 'Is playing the next role: ' + this.characterName;
	}
	return 'Invalid Actor'
};

$(document).ready(function () {

	var table = $("#staff-list");
	var showCast = $('#show-crew-member');
	var idCounter = 11;
	var saveButton = $("#save-crew-member");
	var form = $('#crew-form');
	var addCrew = $('#add-crew-member');
	var mainImg = $('#showImg');

	function onActorsLoaded(actors) {
		actors.forEach(function ({ id,  actorName, characterName, yearOfBirth = 'Not Provided!', pictureURL}) {
			var actorToBeAdded = new Actor(id, characterName, actorName, pictureURL, yearOfBirth);
			var row = actorToBeAdded.getRow()
			table.append(row);
		});
		var actor1 = new Actor(11, 'Bill', 'Nick Offerman' ,'https://m.media-amazon.com/images/M/MV5BMTYzMjY2ODkxMV5BMl5BanBnXkFtZTgwMjQxMDA5MTE@._V1_UX32_CR0,0,32,44_AL_.jpg', '1970');
		console.log(actor1.actorName);
		actor1.actorName = 'Dan Puric'
		console.log(actor1.actorName);


		var row1 = actor1.getRow();
		table.append(row1);
		var actor2 = new Actor(12, 'Dr. Neuman','John Hannah', 'https://m.media-amazon.com/images/M/MV5BMTk4Nzk0NjA5OV5BMl5BanBnXkFtZTcwNjM2NDA4MQ@@._V1_UY44_CR0,0,32,44_AL_.jpg', '1962');
		var row2 = actor2.getRow();
		table.append(row2);
	};

	// mainImg.mouseover(function() {
	// 	showCast.fadeToggle()
	// })

	function importActors() {
		$.ajax({
			method: "GET",
			url: "actors.json",
			success: onActorsLoaded,
			error: onError,
		});
	};

	showCast.on('click', function() {
		importActors();
		// $(this).remove();
		table.fadeIn();
		addCrew.fadeIn();
	});

	function onError(jqXhr, textStatus) {
		console.log("textStatus: ", textStatus);
		console.log("jqXhr: ", jqXhr);
	};

	var addRow = function() {
		var actorName = $('#actor-name').val();
		var characterName = $('#character-name').val();
		var picture = $('#picture').val();
		var birthDate = $('#year-of-birth').val() || 'Not Provided!';

		if(!actorName || !characterName || !picture) {
			alert('Please fill out all fields!');
			return;
		};

		var rowElement = `<tr>
			<td>${idCounter}</td>
			<td>${actorName}</td>
			<td>${characterName}</td>
			<td>${birthDate}</td>
			<td><img src="${picture}"></img></td>
			<td>
				<span>
					<a class="remove" href="#">Remove</a>
				</span>
			</td>
			</tr>`;

		idCounter++;
		table.append(rowElement);
	};



	var showForm = function() {
		form.slideToggle();
	};

	var slideOutForm = function() {
		form.slideUp();
	};

	addCrew.on('click', showForm);

	
	saveButton.on('click', function(e) {
		e.preventDefault();
		addRow();
		slideOutForm();
		$('input').val('');
	});

	var removeRow = function(e) {
		e.preventDefault();
		$(this).closest('tr').fadeOut(function(){
			$(this).remove();
			idCounter--;
			$("#staff-list tr").not(':first').each(function(index, tr) {
				$(tr).find("td:first").text(index + 1);
			});
		});
	};

	table.on('click', '.remove', removeRow)
});
