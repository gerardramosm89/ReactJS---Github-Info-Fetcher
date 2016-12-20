var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var Notes = require('./Notes/Notes');
var UserProfile = require('./Github/UserProfile');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
Firebase.initializeApp(
{
        apiKey: "AIzaSyCiIAx4C_n7RHR7jxoMtfNfF9ceJ7NFv1Q",
            authDomain: "github-notetaker-e4eda.firebaseapp.com",
                databaseURL: "https://github-notetaker-e4eda.firebaseio.com",
                    storageBucket: "github-notetaker-e4eda.appspot.com",
                        messagingSenderId: "902015046870"
                            }
);

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      notes: [1,2,3],
      bio:{
        name: 'Gerry Ramos'
      },
      repos:['a','b','c']
    }
  },
  componentDidMount: function(){
    this.ref = Firebase.database();
    var childRef = this.ref.child(this.props.params.username);
    this.bindAsArray(childRef,'notes');

  },
  componentWillUnmount: function(){
    this.unbind('notes');
  },
  render: function(){
  return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={ this.props.params.username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={ this.props.params.username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes username={ this.props.params.username} notes={this.state.notes}/>
        </div>
      </div>
  )
  }

});

module.exports = Profile;
