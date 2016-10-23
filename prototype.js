/*header: ('content-type: application/json; charset=utf-8');
header: ("access-control-allow-origin: *");
$.ajax({
    url: "C:\Users\Owner\OneDrive\Programming\Javascript\list of skills.xlsx",
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
    	//call function

    }
})*/
 person = {
        name:  "Fred",
        cashRegister:  1,
        driveThru:  1,
        sales:  0
    }
    jobs = {
        McDonalds:  {
        cashRegister:  1,
        driveThru:  1,
        sales:  0
        },
        Houlihans:  {
        cashRegister:  1,
        driveThru:  0,
        sales:  0
        }
    }
    personJobsMatched = {
        name: ""
    }
    personJobsMatchValues = [];

   function compare(person, jobs){
        personColumn = 0;
        for (personSkill in person){
            if (personColumn == 0){
                personJobsMatched.name = personSkill;
                console.log(personSkill);
            }
            if (personColumn != 0){
                for (job in jobs){
                    jobName = job[0];
                    jobColumn = 0;
                    jobSkillsMatched = 0;
                    for (jobSkill in job){
                        if (jobColumn != 0){
                            if (personSkill == jobSkill){
                                jobSkillsMatched += 1;
                            }
                        }
                        jobColumn += 1;
                    }
                    jobMatchValue = (jobSkillsMatched / jobColumn) * 100;
                    console.log(jobMatchValue);
                    personJobsMatched[jobName] = jobMatchValue;

                }
            }
            personColumn += 1;
        }
};