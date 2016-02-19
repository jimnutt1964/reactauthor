/** @jsx React.DOM */
(function () {
	'use strict';
	
	var Quiz = React.createClass({displayName: "Quiz",
		propTypes:{
			data: React.PropTypes.array.isRequired
		},
		getInitialState: function () {
			return this.props.data.selectGame();
		},
		render: function (){
			return (React.createElement("div", null, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-md-4"}, 
						React.createElement("img", {src: this.state.author.imageUrl, className: "authorimage"})
					), 
					React.createElement("div", {className: "col-md-7"}, 
						this.state.books.map(function (b){
							return React.createElement(Book, {title: b});
						}, this)
					), 
					React.createElement("div", {className: "col-md-1"})
				)
			));
		}
	});
	
	var Book = React.createClass({displayName: "Book",
		propTypes:{
			title: React.PropTypes.string.isRequired
		},
		render: function() {
			return React.createElement("div", {className: "answer"}, React.createElement("h4", null, this.props.title));
		}
	})

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
			})
		};
	};
	
	React.renderComponent(React.createElement(Quiz, {data: data}),
		document.getElementById('app'));
})();