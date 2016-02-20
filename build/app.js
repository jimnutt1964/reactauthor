/** @jsx React.DOM */
(function () {
	'use strict';
	
	var Quiz = React.createClass({displayName: "Quiz",
		propTypes:{
			data: React.PropTypes.array.isRequired
		},
		getInitialState: function () {
			return _.extend({
				bgClass: 'neutral',
				showContinue: false
			}, this.props.data.selectGame());
		},
		handleBookSelected: function(title){
			var isCorrect = this.state.checkAnswer(title);
			this.setState({
				bgClass: isCorrect ? 'pass' : 'fail',
				showContinue: isCorrect
			});
		},
		handleContinue: function (){
			this.setState(this.getInitialState());
		},
		render: function (){
			return (React.createElement("div", null, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-md-4"}, 
						React.createElement("img", {src: this.state.author.imageUrl, className: "authorimage"})
					), 
					React.createElement("div", {className: "col-md-7"}, 
						this.state.books.map(function (b){
							return React.createElement(Book, {onBookSelected: this.handleBookSelected, title: b});
						}, this)
					), 
					React.createElement("div", {className: "col-md-1 " + this.state.bgClass})
				), 
				this.state.showContinue ? (
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col-md-12"}, 
							React.createElement("input", {onClick: this.handleContinue, type: "button", className: "btn btn-primary pull-right", value: "Continue"})
						)
					)) : React.createElement("span", null)
				
			)
			);
		}
	});
	
	var Book = React.createClass({displayName: "Book",
		propTypes:{
			title: React.PropTypes.string.isRequired
		},
		handleClick: function(){
			this.props.onBookSelected(this.props.title);
		},
		render: function() {
			return 	React.createElement("div", {onClick: this.handleClick, className: "answer"}, 
						React.createElement("h4", null, this.props.title)
					);
		}
	});

	var data = [
		{
			name: 'Mark Twain',
			imageUrl: 'images/marktwain.jpg',
			books: ['The Adventures of Huckleberry Finn']
		},
		{
			name: 'Joseph Conrad',
			imageUrl: 'images/josephconrad.png',
			books: ['Heart of Darkness']
		},
		{
			name: 'J.K. Rowling',
			imageUrl: 'images/jkrowling.jpg',
			imageSource: 'Wikimedia Commons',
			imageAttribution: 'Daniel Ogren',
			books: ['Harry Potter and the Sorcerers Stone']
		},
		{
			name: 'Stephen King',
			imageUrl: 'images/stephenking.jpg',
			imageSource: 'Wikimedia Commons',
			imageAttribution: 'Pinguino',
			books: ['The Shining','IT']
		},
		{
			name: 'Charles Dickens',
			imageUrl: 'images/charlesdickens.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['David Copperfield','A Tales of Two Cities']
		},
		{
			name: 'William Shakespeare',
			imageUrl: 'images/williamshakespeare.jpg',
			books: ['Hamlet','Macbeth','Romeo and Juliet']
		}
	];
	data.selectGame = function () {
		var books = _.shuffle(this.reduce(function (p,c,i) {
				return p.concat(c.books);
			}, [])).slice(0,4);

		var answer = books[_.random(books.length-1)];

		return {
			books: books,
			author: _.find(this, function(author) {
				return author.books.some(function (title) {
					return title === answer;
				});
			}),
			checkAnswer : function(title){
				return this.author.books.some(function(t){
					return t === title;
				});
			}
		};
	};

	React.renderComponent(React.createElement(Quiz, {data: data}),
		document.getElementById('app'));
})();