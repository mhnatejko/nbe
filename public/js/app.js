console.log('client script side is loaded');

const weatherForm = document.querySelector('form');
const inputSearch = document.querySelector('input');
const messageOne = document.getElementById('meddage_one');
const messageTwo = document.getElementById('meddage_two');

weatherForm.addEventListener('submit', function(e){
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    e.preventDefault();
    fetch(`http://localhost:3000/weather?address=${inputSearch.value}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                messageOne.textContent = '';
                messageTwo.textContent = data.error;
            }else{
                console.log(data);
                messageOne.textContent = '';
                messageTwo.textContent = `${data.location} ${data.forecast}`;

            }
        });
});