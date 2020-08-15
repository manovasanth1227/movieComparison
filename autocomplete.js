const createAutocomplete = ({root, renderOption,onOptionSelect,fetch})=>{
    root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class ="input"/>
    <div class ="dropdown">
        <div class ="dropdown-menu">
            <div class ="dropdown-content results"></div>
        </div>
    </div>
    `;
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');



    let  timerId;
    const debounce = (func , delay=1000) =>{
        return (...args)=>{
            if(timerId) clearTimeout(timerId);
            timerId = setTimeout(()=>{
                    func.apply(null,args);
            },delay);
        };
    }
    const onInput = async (event)=>{
    const movies  = await fetch(event.target.value);
    if(!movies.length){
        
        dropdown.classList.remove('is-active');
        return;
    }
    resultsWrapper.innerHTML ='';
    dropdown.classList.add('is-active');
    for( let movie of movies){
        const option = document.createElement('a');
        option.classList.add('dropdown-item');

        option.innerHTML = renderOption(movie);

        resultsWrapper.appendChild(option);
        option.addEventListener('click', (event) =>{
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onOptionSelect(movie);
        })
    
    }
    };
    input.addEventListener('input', debounce(onInput,500));

    document.addEventListener('click' ,(event)=>{
        if( !root.contains(event.target)){
            dropdown.classList.remove('is-active');
        }
    });
}