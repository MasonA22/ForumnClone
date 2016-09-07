Template.badge.events({
    "click img": function(evt){
        evt.preventDefault();
        $(evt.currentTarget).next().click();
    },
    "change .updateBadgeAvatarContainer": function(evt){
        evt.preventDefault();
        var badgeId = this._id;
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function (err, fileObj) {
                if (err){
                } 
                else {
                    setTimeout(function(){
                        var imagePath = "/cfs/files/images/" + fileObj._id;
                        Meteor.call("updateBadge", badgeId, imagePath);
                    }, 1000);
                }
            });
        });
    },
    "click .deleteBadge": function(evt){
        evt.preventDefault();
        var badgeId = this._id;
        Meteor.call("deleteBadge", badgeId);
    }
});