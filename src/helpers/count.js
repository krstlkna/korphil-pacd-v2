export default {
    ages: [
        {
            name: '15-25',
            clients: 0,
        },
        {
            name: '26-35',
            clients: 0,
        },
        {
            name: '36-45',
            clients: 0,
        },
        {
            name: '46-55',
            clients: 0,
        },
        {
            name: '56-65',
            clients: 0,
        },
        {
            name: '66 and Above',
            clients: 0,
        },
        {
            name: 'Age not indicated',
            clients: 0,
        },
    ],

    feedbacks: [
        {
            id: 1,
            question: 'Mabilis na serbisyo',
            rating: null,
            page: 2,
        },
        {
            id: 2,
            question: 'Mahusay at may malasakit na serbisyo',
            rating: null,
            page: 3,
        },
        {
            id: 3,
            question: 'Magalang at tapat na serbisyo',
            rating: null,
            page: 4,
        },
        {
            id: 4,
            question: 'Malinis at Maayos na tanggapan',
            rating: null,
            page: 5,
        },
        {
            id: 5,
            question: 'Mapagkakatiwalaan na serbisyo',
            rating: null,
            page: 6,
        },
        {
            id: 6,
            question: 'Abot Lahat ang serbisyo ng TESDA',
            rating: null,
            page: 7,
        },
        {
            id: 7,
            question: 'Kabuuang antas ng kasiyahan sa serbisyong natanggap',
            rating: null,
            page: 8,
        },
    ],

    rates: [
        {
            name: 'Very Satisfactory',
            clients: 0,
        },
        {
            name: 'Satisfactory',
            clients: 0,
        },
        {
            name: 'Poor',
            clients: 0,
        },
    ],

    recommends: [
        {
            name: 'Yes',
            clients: 0,
        },
        {
            name: 'No',
            clients: 0,
        },
        {
            name: 'No Answer',
            clients: 0,
        },
    ],

    countMale(clients) {
        let maleCount = 0;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].sex == 'Male') {
                maleCount++;
            }
        }
        return maleCount;
    },
    countFemale(clients) {
        let femaleCount = 0;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].sex == 'Female') {
                femaleCount++;
            }
        }
        return femaleCount;
    },
    getTotalSexes(clients) {
        let maleCount = this.countMale(clients);
        let femaleCount = this.countFemale(clients);
        let total = maleCount + femaleCount;
        return total;
    },

    countYes(clients) {
        let yesCount = 0;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].reco == 1) {
                yesCount++;
            }
        }
        return yesCount;
    },
    countNo(clients) {
        let noCount = 0;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].reco == 0) {
                noCount++;
            }
        }
        return noCount;
    },
    countNoAnswer(clients) {
        let noAnswerCount = 0;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].reco == null) {
                noAnswerCount++;
            }
        }
        return noAnswerCount;
    },

    getTotalReco(clients) {
        let yesCount = this.countYes(clients);
        let noCount = this.countNo(clients);
        let noAnswerCount = this.countNoAnswer(clients);
        let total = yesCount + noCount + noAnswerCount;
        return total;
    },

    countActions(clients) {
        let actionCount = 0;
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].actionprovided == null) {
                actionCount++;
            }
        }
        return actionCount;
    },

    getRating(clients, questionId, rating) {
        let total = 0;
        for (let i = 0; i < clients.length; i++) {
            let client = clients[i];
            let feedbacks = client.feedbacks;
            for (let j = 0; j < feedbacks.length; j++) {
                let feedback = feedbacks[j];
                if (feedback.id == questionId && feedback.rating == rating) {
                    total++;
                }
            }
        }
        return total;
    },

    getTotalFeedbacks(clients, questionId) {
        let vsTotal = this.getRating(clients, questionId, 1);
        let sTotal = this.getRating(clients, questionId, 0);
        let pTotal = this.getRating(clients, questionId, -1);
        let total = vsTotal + sTotal + pTotal;
        return total;
    },

    getVsTotal(clients) {
        let total = 0;
        let vsTotal = this.getRating(clients, questionId, 1);
        total += vsTotal
        return total;
    },
}