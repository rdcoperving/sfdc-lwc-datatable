import {
    LightningElement,
    wire,
    track
} from 'lwc';
import
MyFollowings
from '@salesforce/apex/AccountListController.Getcontacts';
const columns = [{
        label: 'contact Name',
        fieldName: 'Name'
    },
    {
        label: 'email',
        fieldName: 'Email'
    },
    {
        label: 'Account Name',
        fieldName: 'Account.Name'
    },
    {
        label: 'Percentage',
        fieldName: 'Percent_Teaching_Time__c',
        type: "percent"
    }
];
export default class LwcDataTable extends LightningElement {
    @track topcontacts = [];
    @track columns = columns;
    @wire(MyFollowings)
    followings({
        error,
        data
    }) {
        if (error) {
            // TODO: Error handling
        } else if (data) {
            let myconsData = [];
            data.forEach((con) => {
                myconsData.push(this.flatten(con));
            });
            this.topcontacts = myconsData;
        }
    }

    _flatten(target, obj, path) {
        var i, empty;
        if (obj.constructor === Object) {
            empty = true;
            for (i in obj) {
                empty = false;
                this._flatten(target, obj[i], path ? path + '.' + i : i);
            }
            if (empty && path) {
                target[path] = {};
            }
        } else if (obj.constructor === Array) {
            i = obj.length;
            if (i > 0) {
                while (i--) {
                    this._flatten(target, obj[i], path + '[' + i + ']');
                }
            } else {
                target[path] = [];
            }
        } else {
            target[path] = obj;
        }
    }

    flatten(data) {
        var result = {};
        this._flatten(result, data, null);
        return result;
    }
}