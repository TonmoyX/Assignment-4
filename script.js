const interList = [];
const rejectList = [];

const totalCount = document.getElementById("headTotal");
const headInter = document.getElementById("head-Inter");
const headReject = document.getElementById("head-Reject");
const mainCount = document.getElementById("main-count");

const allCardSection = document.getElementById('allCards')

function count(){
    totalCount.innerText = allCardSection.children.length;
    mainCount.innerText = allCardSection.children.length + " jobs";
    headInter.innerText = interList.length;
    headReject.innerText = rejectList.length;
}
count();