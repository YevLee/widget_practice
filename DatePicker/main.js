(function () {
    let datepicker = window.datapicker;
    let day;
    datepicker.buildUi = () => {
        for(let i=0;i<monthData.days.length;i++){

            let date=monthData.days[i];
            if(i%7==0){
                html+='<tr>';
            }
            html+='<td data-date="' + date.date + '">'+date.showDate+'</td>';
            if(i%7==6){
                html+='</tr>'
            }
        }

        let html = ` <div class="ui-datepicker-header">
        <a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>
        <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>
        <span class="ui-datepicker-current-month">2017-11</span>
         </div>
        <div class="ui-datepicker-body">
        <table>
            <thead>
                <tr>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                    <th>日</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>`;
    }
})();