(function () {
    const datepicker = {};
    //get data of a month
    datepicker.getMonthData = (year, month) => {
        let ret = [];
        if (!year || !month) {
            let today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }
        //first day of this month
        let firstDay = new Date(year, month - 1, 1);
        //get the day of the week
        let firstDayWeekDay = firstDay.getDay();
        //Sunday equals 0
        if (firstDayWeekDay === 0) {
            firstDayWeekDay = 7;
        }

        year=firstDay.getFullYear();
        month=firstDay.getMonth()+1;

        //last day of last month
        let lastDayOfLastMonth = new Date(year, month - 1, 0);
        let lastDateOfLastMonth = lastDayOfLastMonth.getDay();
        let preMonthDayCount = firstDayWeekDay;

        let lastDay = new Date(year, month, 0);
        let lastDate = lastDay.getDate();

        for (let i = 0; i < 7 * 6; i++) {
            let date = i + 1 - preMonthDayCount;
            let showDate = date;
            let thisMonth = month;
            //上一个月
            if (date <= 0) {
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if (date > lastDate) {
                //    下一个月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }
            if (thisMonth == 0) thisMonth = 12;
            if (thisMonth == 13) thisMonth = 1;
            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            });
        }
        return {
            year: year,
            month: month,
            days: ret
        };

    };
    window.datapicker = datepicker;
})();