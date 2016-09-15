import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Images } from "../../../api/images.js";

import "./badge.html";

Template.badge.onCreated(function() {
    this.currentUpload = new ReactiveVar(false);
});

Template.badge.helpers({
    avatarImage: function(id) {
        let image = Images.findOne(id);
        return image;
    },
    currentUpload: function () {
        return Template.instance().currentUpload.get();
    }
});

Template.badge.events({
    "click img": function(evt){
        evt.preventDefault();
        $(evt.currentTarget).next().click();
    },
    "change .updateBadgeAvatarContainer": function(evt, template){
        evt.preventDefault();
        let badgeId = this._id;
        if ($(evt.currentTarget).find(".updateBadgeAvatar")[0].files && $(evt.currentTarget).find(".updateBadgeAvatar")[0].files[0]) {
            var upload = Images.insert({
                file: $(evt.currentTarget).find(".updateBadgeAvatar")[0].files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);

            upload.on('start', function () {
                template.currentUpload.set(this);
            });

            upload.on('end', function (error, fileObj) {
                if (error) {
                    alert('Error during upload: ' + error);
                } 
                else {
                    let imageId = upload.config.fileId;
                    Meteor.call("updateBadge", badgeId, imageId);
                }
                template.currentUpload.set(false);
            });
            upload.start();
        }
    },
    "click .deleteBadge": function(evt){
        evt.preventDefault();
        var badgeId = this._id;
        Meteor.call("deleteBadge", badgeId);
    }
});