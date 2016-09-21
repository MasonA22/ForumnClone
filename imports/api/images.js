import { FilesCollection } from 'meteor/ostrio:files';

export const Images = new FilesCollection({
    collectionName: 'Images',
    onBeforeUpload: function (file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        } 
        else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    }
});

if (Meteor.isServer) {
    Meteor.publish('images', function () {
        return Images.find().cursor;
    });
}

Meteor.methods({
    editImage: function(imageId, name){
        console.log("Editing image...");
        Images.update({_id: imageId},{
            $set: {
                name: name
            }
        });
    },
    deleteImage: function(imageId) {
        Images.remove(imageId);
    }
});