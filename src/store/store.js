import { makeObservable, observable, action } from "mobx";

class DataStore {

    services = [];
    meetings = [];
    isLogin = false;
    isAddMeeting = false;
    business = {};

    constructor() {
        makeObservable(this, {
            isLogin: observable,
            setIsLogin: action,
            services: observable,
            setServices: action,
            addService: action,
            meetings: observable,
            setMeetings: action,
            addMeeting: action,
            business: observable,
            editedBusiness: action,
            isAddMeeting: observable,
        })
    }

    setIsLogin(status) {
        this.isLogin = status;
    }

    setServices = (services) => {
        console.log(services)
        if (services.length > 0) {
            this.services = services;
        }
    }

    addService = (service) => {
        this.services = [...this.services, service];
    }

    setMeetings = (meetings) => {
        meetings.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
        this.meetings = meetings;
    }

    addMeeting = (meeting) => {
        console.log("addMeeting", meeting);
        this.meetings = [...this.meetings, meeting];
        this.isAddMeeting = true;
    }

    editedBusiness = (business) => {
        this.business = business;
        return { ...this.business, business };
    }
}

export default new DataStore();
