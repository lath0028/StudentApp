v $(document ).ready(function() {
    //get all the data on app startup
    LoadData();
    function LoadData(){
        studentRef.get().then(function(querySnapshot){
            LoadTableData(querySnapshot)
        });    
    }
    
    function LoadTableData(querySnapshot){
        var tableRow='';
        querySnapshot.forEach(function(doc){
            var document=doc.data();
            tableRow+='<tr>';
            tableRow+='<td class="fname">' +document.fName+'</td>';
            tableRow+='<td class="mname">' +document.mName+'</td>';
            tableRow+='<td class="lname">' +document.lName+'</td>';
            tableRow+='<td class="address">' +document.address+'</td>';
            tableRow+='<td class="email">' +document.email+'</td>';
            tableRow+='<td class="age">' +document.age+'</td>';
            tableRow+='<td class="gender">' +document.gender+'</td>';
            tableRow+='<td class="course">' +document.course+'</td>';
            tableRow+='<td class="isFullTime">' +document.isFullTime+'</td>';
            tableRow+='<td class="editStudent"><i class="fa fa-pencil" aria-hidden="true" style="color:green"></i></td>';
            tableRow+='<td class="deleteStudent"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></td>';
            tableRow+='</tr>';
        });
        $(`tbody.tbodyData`).html(tableRow);
    }
    $('#createStudent').click(function(){
        $('.studentForm').css("display", "block");
        $('#dynamicBtn').text('Save Changes')
    });

    $('#dynamicBtn').click(function(){
        //student form values
        var fname = $("#fname").val();
        var mname = $("#mname").val();
        var lname = $("#lname").val();
        var address = $("#address").val();
        var email = $("#email").val();
        var age = $("#age").val();
        var gender = $("#gender").val();
        var course = $("#course").val();
        var isfulltime = $('#isFullTime').is(":checked")

        //check if you need to create or update an student
        if($(this).text() == "Save Changes"){
        
            var docName=fname.charAt(0)+"."+lname;
            db.collection("Student").doc(docName).set({
                fName:fname,
                lName:lname,
                mName:mname,
                address:address,
                email:email,
                age:age,
                gender:gender,
                course:course,
                isFullTime:isfulltime
            }).then(function(docRef){
                $('#operationStatus').html('<div class="alert alert-success"><strong>Success!</strong>Student was created!</div>').delay(2500).fadeOut('slow');
                $('.studentForm').css("display","none");
                LoadData();
            }).catch(function(error){
                     $('#operationStatus').html('<div class="alert alert-danger"><strong>Error!</strong>Student was not created!</div>').delay(2500).fadeOut('slow');
                     });
        
        }
        else{
            var docName=fname.charAt(0)+"."+lname;
            var sfDocRef=db.collection("Student").doc(docName);
            sfDocRef.set({
                fName:fname,
                lName:lname,
                mName:mname,
                address:address,
                email:email,
                age:age,
                gender:gender,
                course:course,
                isFullTime:isfulltime
            },{
                   merge:true      
                         }).then(function(docRef){
                $('#operationStatus').html('<div class="alert alert-success"><strong>Update!</strong>Student was Updated!</div>').delay(2500).fadeOut('slow');
                $('.studentForm').css("display","none");
                LoadData();
            }).catch(function(error){
                     $('#operationStatus').html('<div class="alert alert-danger"><strong>Error!</strong>Student was not updated!</div>').delay(2500).fadeOut('slow');
                     });
        }
    });

    // Cancel the Student form
    $('#cancel').click(function(){
        $('.studentForm').css("display", "none");
    });

    // Get the data of the student you want to edit
    $("tbody.tbodyData").on("click","td.editStudent", function(){
        $('.studentForm').css("display", "block");
        $('#dynamicBtn').text('Update Student');

        $("#fname").val($(this).closest('tr').find('.fname').text());
         $("#mname").val($(this).closest('tr').find('.mname').text());
        $("#lname").val($(this).closest('tr').find('.lname').text());
         $("#address").val($(this).closest('tr').find('.address').text());
        $("#email").val($(this).closest('tr').find('.email').text());
        $("#age").val($(this).closest('tr').find('.age').text());
        $("#gender").val($(this).closest('tr').find('.gender').text());
        $("#course").val($(this).closest('tr').find('.course').text());
        $("#isFullTime").prop('checked', $(this).closest('tr').find('.isfulltime').text() === 'true');
    });

    // Delete student
    $("tbody.tbodyData").on("click","td.deleteStudent", function(){
        //Get the Student Data
        var fName = $(this).closest('tr').find('.fname').text(); //First Name
        var lName = $(this).closest('tr').find('.lname').text(); //Last Name
        
       var docName=fName.charAt(0)+"."+lName;
        
        db.collection("Student").doc(docName).delete().then(function(){
                $('#operationStatus').html('<div class="alert alert-success"><strong>Update!</strong>Student was deleted!</div>').delay(2500).fadeOut('slow');
                $('.studentForm').css("display","none");
                LoadData();
            }).catch(function(error){
                     $('#operationStatus').html('<div class="alert alert-danger"><strong>Error!</strong>Student was not deleted!</div>').delay(2500).fadeOut('slow');
                     });
    });

    $("#searchStudent" ).change(function() {
        console.log('You entered: ', $(this).val());
      });
});   