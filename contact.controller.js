(function () {
    var module = angular.module("ContactApp");

    module.controller("ContactController", ContactController);

    function ContactController(ContactDataService) {
        var self = this;

        this.addMode = false;
        this.editMode = false;

        ContactDataService.getContacts()
            .then(function (data) {
                self.contacts = data;
                self.selectedContact = data[0];
            });

        this.selectContact = function (index) {
            this.selectedContact = this.contacts[index];
            this.successMessage = undefined;
            this.errorMessage = undefined;
        }

        this.toggleEditMode = function () {
            this.editMode = !this.editMode;
        }

        this.saveUser = function () {
            this.toggleEditMode();
            var userData = self.selectedContact;
            if (this.addMode) {
                ContactDataService.createUser(userData)
                    .then(function () {
                            self.successMessage = "Data successfuly created.";
                        },
                        function () {
                            self.errorMessage = "There was an error. Please try again."
                        });
                self.addMode = false;
            } else {
                ContactDataService.saveUser(userData)
                    .then(function () {
                            self.successMessage = "Data successfuly updated.";
                        },
                        function () {
                            self.errorMessage = "There was an error. Please try again."
                        });
            }
        }

        this.addContact = function () {
            this.addMode = true;
            this.selectedContact = {
                "id": new Date().toTimeString()
            };
            this.editMode = true;
        }
    }
})();