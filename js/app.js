/** @jsx React.DOM */
(function () {
	'use strict';
	
	var Quiz = React.createClass({
		propTypes:{
			data: React.PropTypes.array.isRequired
		},
		getInitialState: function () {
			return {
				author: this.props.data[0],
				books: this.props.data[0].books
			};
		},
		render: function (){
			return (<div>
				<div className="row">
					<div className="col-md-4">
						<img src={this.state.author.imageUrl} className="author" />
					</div>
					<div className="col-md-7">
						{this.state.books.map(function (b){
							return <Book title={b} />;
						}, this)}
					</div>
					<div className="col-md-1"></div>
				</div>
			</div>);
		}
	});
	
	var Book = React.createClass({
		propTypes:{
			title: React.PropTypes.string.isRequired
		},
		render: function() {
			return <div className="answer"><h4>{this.props.title}</h4></div>;
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
	
	React.renderComponent(<Quiz data={data} />,
		document.getElementById('app'));
})();