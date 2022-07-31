const post_modal_form = document.getElementById('post_modal_form');
const edit_post_form = document.getElementById('edit_post_form');
const msg = document.querySelector('.msg');
const post_details = document.querySelector('.post-details');

const dataShow = () => {
    let data = readLSData('post');
    let list = '';

    if(!data || data.length == 0){
        list += `
            <div class="card">
                <div class="card-header">
                    <h4>No Data Found</h4>
                </div>
            </div>
        `;
    }

    if(data && data.length > 0){
        data.reverse().map( postItem => {
            list += `
                <div class="card p-3 mb-3">
                    <div class="d-flex justify-content-between">
                    <div class="post-details-left">
                        <div class="d-flex align-items-center gap-3">
                        <div class="follower-content text-center">
                            <canvas class="_aarh" height="56" width="56"
                            style="width: 56px;height: 56px;background: linear-gradient(294.72deg, #FF4581 9.05%, #4388DD 79.28%);border-radius: 50%"></canvas>
                            <img src="${postItem.authPhoto}" alt="" style="width: 50px; height: 50px">
                        </div>
                        <a href="#" class="profile-des-title">${postItem.authName}</a>

                        </div>
                    </div>
                    <div class="dropdown post-details-right">
                        <a href="#" class="threeDots" id="threeDots-dropdown" data-bs-toggle="dropdown" aria-expanded="true">
                        <i class="bi bi-three-dots"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="threeDots-dropdown">
                        <li><a class="dropdown-item edit-btn" post_id=${postItem.postID} href="#edit_post_modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item delete-btn" post_id=${postItem.postID} href="#">Delete</a></li>
                        </ul>
                    </div>
                    </div>
                    <div class="post-content">
                    <img src="${postItem.postPhoto}" alt="" class="img-fluid rounded mt-3">
                    <p class="mt-3">${postItem.postDescription}</p>
                    </div>
                </div>
            `;
        })
    }
    post_details.innerHTML = list;
}

dataShow();

post_modal_form.onsubmit = (e) => {
    e.preventDefault();


    let form_data = new FormData(e.target);
    let { authName, authPhoto, postPhoto, postDescription } = Object.fromEntries(form_data.entries());
    let instaData = Object.fromEntries(form_data.entries());

    let randomID = Math.floor(Math.random() * 1000) + "_" + Date.now();

    console.log(randomID);

    if( !authName || !authPhoto || !postPhoto || !postDescription ){
        msg.innerHTML = setAlert('All fields are required!!');
    }else{

        createLSData('post', {...instaData, postID: randomID});

        msg.innerHTML = setAlert('Data stable', 'success');
        post_modal_form.reset();
        dataShow();
    }
    
}

post_details.onclick = (e) => {
    e.preventDefault();

    if(e.target.classList.contains('edit-btn')){
        let postID = e.target.getAttribute('post_id');

        let posts = readLSData('post');


        let { authName, authPhoto, postPhoto, postDescription } = posts.find(data => data.postID == postID);

        edit_post_form.innerHTML = `
            <div class="my-3">
                <label for="">Auth Name</label>
                <input type="text" class="form-control" name="authName" value="${authName}">
            </div>
            <div class="my-3">
                <img src="${authPhoto}" class="w-100"/>
            </div>
            <div class="my-3">
                <label for="">Auth Photo</label>
                <input type="text" class="form-control" name="authPhoto" value="${authPhoto}">
            </div>
            <div class="my-3">
                <img src="${postPhoto}" class="w-100"/>
            </div>
            <div class="my-3">
                <label for="">post Photo</label>
                <input type="text" class="form-control" name="postPhoto" value="${postPhoto}">
            </div>
            <div class="my-3">
                <input type="hidden" class="form-control" name="postID" value="${postID}">
            </div>
            <div class="my-3">
                <label for="">post Description</label>
                <textarea id="" rows="3" class="form-control" name="postDescription">${postDescription}</textarea>
            </div>
            <div class="my-3">
                <input type="submit" class="btn btn-primary w-100" value="Edit Post">
            </div>
        `;

        
        
    }
    if(e.target.classList.contains('delete-btn')){
        let postID = e.target.getAttribute('post_id');
        
        let posts = readLSData('post');

        let deleted_data = posts.filter(data => data.postID !== postID);

        updateLSData('post', deleted_data);

        dataShow();

    }
}

edit_post_form.onsubmit = (e) => {
    e.preventDefault();


   let form_data = new FormData(e.target);
   let {authName, authPhoto, postPhoto, postID, postDescription}= Object.fromEntries(form_data.entries());
//    let data = Object.fromEntries(form_data.entries());


   let all_data = readLSData('post');



   all_data.map((dataItem, index) => {
        if(dataItem.postID == postID){
            dataItem.authName = authName;
            dataItem.authPhoto = authPhoto;
            dataItem.postPhoto = postPhoto;
            dataItem.postDescription = postDescription;
        }
   })


   updateLSData('post', all_data);

   dataShow();

   


    


    
}