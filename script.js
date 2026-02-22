let interList = [];
let rejectList = [];
let currentStatus = 'all';

const totalCount = document.getElementById("headTotal");
const headInterCount = document.getElementById("headInter");
const headRejectCount = document.getElementById("headReject");
const mainCount = document.getElementById("main-count");

const mainContainer = document.querySelector('main');
const noAvailableJob = document.getElementById('noAvailable');

const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filter-section');

function count(){
    totalCount.innerText = allCardSection.children.length;
    mainCount.innerText = allCardSection.children.length + " jobs";
    headInterCount.innerText = interList.length;
    headRejectCount.innerText = rejectList.length;
}
count();

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectBtn = document.getElementById('reject-btn');

function toggle(id){
      allBtn.classList.remove('bg-[#3B82F6]', 'text-white');
      interviewBtn.classList.remove('bg-[#3B82F6]', 'text-white');
      rejectBtn.classList.remove('bg-[#3B82F6]', 'text-white');

      allBtn.classList.add('bg-white', 'text-[#64748B]')
      interviewBtn.classList.add('bg-white', 'text-[#64748B]')
      rejectBtn.classList.add('bg-white', 'text-[#64748B]')

      const select = document.getElementById(id);
      select.classList.add('bg-[#3B82F6]', 'text-white');
      select.classList.remove('bg-white', 'text-[#64748B]');

      if (id == 'interview-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInter()
    } else if (id == 'all-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
        noAvailableJob.classList.add('hidden');
    } else if (id == 'reject-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderReject()
    }

  
}
mainContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('interBtn')){
        const parenNode = e.target.parentNode.parentNode;
        

        const company = parenNode.querySelector('.companyName').innerText
        const designation = parenNode.querySelector('.designation').innerText
        const locationSalary = parenNode.querySelector('.locationSalary').innerText
        const status = parenNode.querySelector('.status').innerText
        const note = parenNode.querySelector('.note').innerText

        parenNode.querySelector('.status').innerText = 'Interview';
        parenNode.querySelector('.status').classList.remove('bg-[#002C5C]/10', 'text-[#002C5C]');
        parenNode.querySelector('.status').classList.add('bg-green-500', 'text-[#ffff]');

        const cardInfo = {
            company,
            designation,
            locationSalary,
            status: 'Interview',
            note
        }
        const companyExist = interList.find(item => item.company == cardInfo.company);
        if(!companyExist){
            interList.push(cardInfo);
        }

        rejectList = rejectList.filter(item => item.company != cardInfo.company);

        // Update status in allCardSection
        const allCards = allCardSection.querySelectorAll('.card');
        for (let card of allCards) {
            if (card.querySelector('.companyName').innerText === company) {
                card.querySelector('.status').innerText = 'Interview';
                card.querySelector('.status').classList.remove('bg-[#002C5C]/10', 'text-[#002C5C]');
                card.querySelector('.status').classList.add('bg-green-500', 'text-[#ffff]');
                break;
            }
        }

        //current status from toogle style
          if (currentStatus == 'interview-btn') {
            renderReject()
        }
        count();
    }
    else if(e.target.classList.contains('rejectBtn')){
         const parenNode = e.target.parentNode.parentNode;

        const company = parenNode.querySelector('.companyName').innerText
        const designation = parenNode.querySelector('.designation').innerText
        const locationSalary = parenNode.querySelector('.locationSalary').innerText
        const status = parenNode.querySelector('.status').innerText
        const note = parenNode.querySelector('.note').innerText

        parenNode.querySelector('.status').innerText = 'Reject';
        parenNode.querySelector('.status').classList.remove('bg-green-500', 'text-[#ffff]', 'bg-[#002C5C]/10');
        parenNode.querySelector('.status').classList.add('bg-red-500', 'text-[#ffff]', 'bg-[#002C5C]/10');

        const cardInfo = {
            company, 
            designation, 
            locationSalary, 
            status: 'Reject',
            note
        }

        const companyExist = rejectList.find(item => item.company == cardInfo.company);
        if(!companyExist){
            rejectList.push(cardInfo);
        }

        interList = interList.filter(item => item.company != cardInfo.company);

        //current status from toogle style
          if (currentStatus == 'reject-btn') {
            renderInter()
        }
         count();
    }

    else if(e.target.classList.contains('dltBtn')){
        const parenNode = e.target.parentNode.parentNode.parentNode.parentNode;
        const company = parenNode.querySelector('.companyName').innerText;

        interList = interList.filter(item => item.company != company);
        rejectList = rejectList.filter(item => item.company != company);

        parenNode.remove();
        count();
        
        if (filterSection.classList.contains('hidden') == false) {
            if (currentStatus == 'interview-btn') {
                renderInter();
            } else if (currentStatus == 'reject-btn') {
                renderReject();
            }
        }
    }
})


function renderInter(){
     filterSection.innerHTML = '';

     if(interList.length < 1){
        noAvailableJob.classList.remove('hidden');
     } else {
        noAvailableJob.classList.add('hidden');
        for (let inter of interList) {
           console.log(inter);

           let div = document.createElement('div');

            div.className = 'card flex justify-between mt-4 p-8 bg-white rounded-[8px]'
           div.innerHTML = `
           <div>
               <div>
               <h1 class="companyName  text-[#002C5C] text-[26px] font-semibold">${inter.company}</h1>
               <p class="designation  text-[#64748B] text-[22px]">${inter.designation}</p>
             </div>
               <h1 class="locationSalary  text-[#64748B] mt-[20px]">${inter.locationSalary}</h1>

                <div>
               <h1 class="status w-[113px] rounded-[4px] text-[14px] bg-green-500 text-[#ffff] font-medium bg-[#002C5C]/10 py-[8px] px-[12px] mt-[20px]">${inter.status}</h1>
               <p class="note  mt-[8px] text-[#323B49]text-[1.1rem]">${inter.note}</p>
           </div>


           <div class="mt-[20px] flex gap-4">
               <button class="interBtn border-1 text-[#10B981] font-semibold text-[14px] border-[#10B981] hover:animate-pulse py-2 px-4 rounded-[4px]">INTERVIEW</button>
               <button class="rejectBtn border-1 text-[#EF4444] font-semibold text-[14px] border-[#EF4444] py-2 px-4 rounded-[4px] hover:animate-pulse">REJECTED</button>
           </div>
           </div>

           <div>
               <button>
                   <h1 class="hover:text-red-700 hover:border-red-700 bg-white p-1 rounded-full text-[1.5rem] text-[#64748B] border-2 border-[#64748B]"><i class="dltBtn fa-regular fa-trash-can"></i></h1>
               </button>
           </div>`
           filterSection.appendChild(div);
        }
     }
}

function renderReject(){
     filterSection.innerHTML = '';

     if(rejectList.length < 1){
        noAvailableJob.classList.remove('hidden');
     } else {
        noAvailableJob.classList.add('hidden');
        for (let reject of rejectList) {

            let div = document.createElement('div');
            div.className = 'card flex justify-between mt-4 p-8 bg-white rounded-[8px]'
            div.innerHTML = `
            <div>
                <div>
                <h1 class="companyName  text-[#002C5C] text-[26px] font-semibold">${reject.company}</h1>
                <p class="designation  text-[#64748B] text-[22px]">${reject.designation}</p>
              </div>
                <h1 class="locationSalary  text-[#64748B] mt-[20px]">${reject.locationSalary}</h1>

                 <div>
                <h1 class="status w-[113px] rounded-[4px] text-[14px] bg-red-500 text-[#ffff] font-medium bg-[#002C5C]/10 py-[8px] px-[12px] mt-[20px]">${reject.status}</h1>
                <p class="note  mt-[8px] text-[#323B49]text-[1.1rem]">${reject.note}</p>
            </div>


            <div class="mt-[20px] flex gap-4">
                <button class="interBtn border-1 text-[#10B981] font-semibold text-[14px] border-[#10B981] hover:animate-pulse py-2 px-4 rounded-[4px]">INTERVIEW</button>
                <button class="rejectBtn border-1 text-[#EF4444] font-semibold text-[14px] border-[#EF4444] py-2 px-4 rounded-[4px] hover:animate-pulse">REJECTED</button>
            </div>
            </div>

            <div>
                <button>
                    <h1 class="hover:text-red-700 hover:border-red-700 bg-white p-1 rounded-full text-[1.5rem] text-[#64748B] border-2 border-[#64748B]"><i class="dltBtn fa-regular fa-trash-can"></i></h1>
                </button>
            </div>`
            filterSection.appendChild(div);
         }
     }
}
