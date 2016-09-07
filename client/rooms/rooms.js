Template.rooms.onCreated(function(){
	Meteor.subscribe("rooms");
});

Template.rooms.helpers({
	rooms: function(){
		return Rooms.find({});
	}
});

Template.rooms.events({
	"click .deleteRoom": function(evt){
		evt.preventDefault();
		var roomId = this._id;
		Meteor.call("deleteRoom", roomId);
	},
	"focusout .roomName": function(evt){
		evt.preventDefault();
		var roomId = this._id;
		var name = $(evt.target).val();
		Meteor.call("editRoom", roomId, name);
	}
});