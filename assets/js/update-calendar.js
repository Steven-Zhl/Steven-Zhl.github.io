---
layout: null
description: 需要添加这一部分，让Jekyll渲染该文件中的Liquid语法
---

const MONTH_NAME = {
    1: "一月", 2: "二月", 3: "三月", 4: "四月", 5: "五月", 6: "六月",
    7: "七月", 8: "八月", 9: "九月", 10: "十月", 11: "十一月", 12: "十二月"
}
const container = document.querySelector('#update-calendar-container');
const totalUpdates = document.querySelector('#total-updates');
const CONTRIBUTION_LEVELS = {HIGH: "HIGH", MED: "MED", LOW: "LOW", NONE: "NONE"}
const details = document.querySelector('.details');
let totalCommit = 0, avgCommit = 0;

function getGithubRepoCommits(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`;
    return fetch(url).then(response => {
        if (!response.ok)
            throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        else if (response.status === 202)
            return null;
        else if (response.status === 200)
            return response.json();
    }).catch(error => {
        console.error(error);
    });
}

function statCommits(owner, repo) {
    return getGithubRepoCommits(owner, repo).then(datas => {
            if (datas === null)
                return null;
            const commits = {};
            const timeZoneOffset = new Date().getTimezoneOffset() / 60; // 时区偏移量
            for (let weekData of datas) {
                const start = new Date(weekData['week'] * 1000);
                start.setHours(start.getHours() + timeZoneOffset); // 修正时区偏移量
                for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
                    const date = new Date(start);
                    date.setDate(date.getDate() + dayIdx);
                    date.setHours(0, 0, 0, 0);
                    if (weekData['days'][dayIdx] !== 0) {
                        commits[date] = weekData['days'][dayIdx];
                    }
                }
            }
            return commits;
        }
    );
}


function getDaysInLast12Months() {// 向前推12个月，每个月的天数
    const dateCursor = new Date();
    const days = [], months = [], years = [];
    dateCursor.setFullYear(dateCursor.getFullYear() - 1, dateCursor.getMonth(), 1);// 回到上一年的本月月初
    for (let i = 0; i <= 12; i++) {
        dateCursor.setMonth(dateCursor.getMonth() + 1);
        dateCursor.setDate(0);
        // 获取日期信息
        days.push(dateCursor.getDate());
        months.push(dateCursor.getMonth() + 1);
        years.push(dateCursor.getFullYear());
        dateCursor.setDate(dateCursor.getDate() + 1); // 回到2月后的月初
    }
    return {'DAYS': days, 'MONTHS': months, 'YEARS': years};
}

function getDaysInLast2Months() {// 向前推2个月，每个月的天数
    const dateCursor = new Date();
    const days = [], months = [], years = [];
    dateCursor.setDate(1);
    dateCursor.setMonth(dateCursor.getMonth() - 1);
    for (let i = 0; i < 2; i++) {
        dateCursor.setMonth(dateCursor.getMonth() + 1);
        dateCursor.setDate(0);
        // 获取日期信息
        days.push(dateCursor.getDate());
        months.push(dateCursor.getMonth() + 1);
        years.push(dateCursor.getFullYear());
        dateCursor.setDate(dateCursor.getDate() + 1); // 回到2月后的月初
    }
    return {'DAYS': days, 'MONTHS': months, 'YEARS': years};
}

async function GenerateYearCalender() {
    const last12Months = getDaysInLast12Months();
    const dayList = last12Months['DAYS'];
    const monthList = last12Months['MONTHS'];
    const yearList = last12Months['YEARS'];
    let commits = await statCommits('{{ site.update-calendar.github_owner }}', '{{ site.update-calendar.github_repo }}');
    if (commits === null) {
        container.innerHTML = "<p>The commits list has not been generated yet. Please wait a few minutes.</p>";
        return;
    }
    totalCommit = commits;
    let values = Object.values(commits);
    avgCommit = Math.floor(values.reduce((a, b) => a + b, 0) / values.length);

    // 构建日历界面
    for (let monthIdx = 0; monthIdx < dayList.length; monthIdx++) {
        const month = document.createElement('div');
        month.classList.add('month');
        const monthName = document.createElement('h4');
        monthName.innerHTML = MONTH_NAME[monthList[monthIdx]];
        month.appendChild(monthName);

        const weeks = document.createElement('div');
        weeks.classList.add('weeks');
        month.appendChild(weeks);

        let week = document.createElement('div');
        week.classList.add('week');
        weeks.appendChild(week);

        for (let dayIdx = 0; dayIdx < dayList[monthIdx]; dayIdx++) {
            if (dayIdx !== 0 && dayIdx % 7 === 0) {
                week = document.createElement('div');
                week.classList.add('week');
                weeks.appendChild(week);
            }

            const day = document.createElement('div');
            day.classList.add('item');

            // 填色
            const date = new Date(yearList[monthIdx], monthList[monthIdx] - 1, dayIdx + 1);
            if (!(date in totalCommit)) {
                day.setAttribute("level", CONTRIBUTION_LEVELS.NONE);
            } else {
                if (totalCommit[date] >= avgCommit) {
                    day.classList.add('item-high');
                    day.setAttribute("level", CONTRIBUTION_LEVELS.HIGH);
                } else if (totalCommit[date] >= avgCommit / 2) {
                    day.classList.add('item-med');
                    day.setAttribute("level", CONTRIBUTION_LEVELS.MED);
                } else {
                    day.classList.add('item-low');
                    day.setAttribute("level", CONTRIBUTION_LEVELS.LOW);
                }
                day.setAttribute("update", totalCommit[date]);
                day.setAttribute("data", `${yearList[monthIdx]}年${monthList[monthIdx]}月${dayIdx + 1}日`);
                day.onmouseover = e => OnHover(e);
            }

            week.appendChild(day);
        }
        container.appendChild(month);
    }
    totalUpdates.innerHTML = "更新次数: " + Object.values(totalCommit).reduce((a, b) => a + b, 0);
}

async function GenerateMonthCalender() {
    const last2Months = getDaysInLast2Months();
    const dayList = last2Months['DAYS'];
    const monthList = last2Months['MONTHS'];
    const yearList = last2Months['YEARS'];
    const afterDate = new Date();
    afterDate.setDate(1);
    afterDate.setMonth(afterDate.getMonth() - 1);
    let commits = await statCommits('{{ site.update-calendar.github_owner }}', '{{ site.update-calendar.github_repo }}');
    if (commits === null) {
        container.innerHTML = "<p>The commits list has not been generated yet. Please wait a few minutes.</p>";
        return;
    }
    totalCommit = commits;
    let values = Object.values(commits);
    avgCommit = Math.floor(values.reduce((a, b) => a + b, 0) / values.length);

    // 构建日历界面
    for (let monthIdx = 0; monthIdx < dayList.length; monthIdx++) {
        const month = document.createElement('div');
        month.classList.add('month');
        const monthName = document.createElement('h4');
        monthName.innerHTML = MONTH_NAME[monthList[monthIdx]];
        month.appendChild(monthName);

        const weeks = document.createElement('div');
        weeks.classList.add('weeks');
        month.appendChild(weeks);

        let week = document.createElement('div');
        week.classList.add('week');
        weeks.appendChild(week);

        for (let dayIdx = 0; dayIdx < dayList[monthIdx]; dayIdx++) {
            if (dayIdx !== 0 && dayIdx % 7 === 0) {
                week = document.createElement('div');
                week.classList.add('week');
                weeks.appendChild(week);
            }

            const day = document.createElement('div');
            day.classList.add('item');

            // 填色
            const date = new Date(yearList[monthIdx], monthList[monthIdx] - 1, dayIdx + 1);
            if (!(date in totalCommit)) {
                day.setAttribute("level", CONTRIBUTION_LEVELS.NONE);
            } else {
                if (totalCommit[date] >= avgCommit) {
                    day.classList.add('item-high');
                    day.setAttribute("level", CONTRIBUTION_LEVELS.HIGH);
                } else if (totalCommit[date] >= avgCommit / 2) {
                    day.classList.add('item-med');
                    day.setAttribute("level", CONTRIBUTION_LEVELS.MED);
                } else {
                    day.classList.add('item-low');
                    day.setAttribute("level", CONTRIBUTION_LEVELS.LOW);
                }
                day.setAttribute("update", totalCommit[date]);
                day.setAttribute("data", `${yearList[monthIdx]}年${monthList[monthIdx]}月${dayIdx + 1}日`);
                day.onmouseover = e => OnHover(e);
            }

            week.appendChild(day);
        }
        container.appendChild(month);
    }
    totalUpdates.innerHTML += "更新次数: " + Object.values(totalCommit).reduce((a, b) => a + b, 0);
}


let x, y;


function OnHover(e) {
    const data = e.target.getAttribute("data");
    const updateCount = e.target.getAttribute("update");
    details.innerHTML = data + "<br>" + updateCount + "次更新";
    details.style.display = 'block';
    details.style.top = `${y - 85}px`
    details.style.left = `${x - 50}px`
}

document.onmouseover = function (e) {
    if (!e.target.classList.contains('item')) {
        details.style.display = 'none';
    }
    x = e.pageX;
    y = e.pageY;
}
document.addEventListener('DOMContentLoaded', function () {
    GenerateMonthCalender();
});
document.getElementById('change-update-view').addEventListener('change', function () {
    if (this.value === 'Month') {
        container.innerHTML = "";
        totalUpdates.innerHTML = "";
        GenerateMonthCalender();
    } else if (this.value === 'Year') {
        container.innerHTML = "";
        totalUpdates.innerHTML = "";
        GenerateYearCalender();
    }
});
