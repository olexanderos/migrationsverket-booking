const prompts = require('prompts');
 
// let email = "";

// (async () => {
//   const response = await prompts({
//     type: 'text',
//     name: 'email',
//     message: 'Enter your email'
//   });
  
//   email = response.email;
//   //console.log(email.email);
// })();

// console.dir(email);

//email();

/*exports.interactiveReAuth = async ({ reAuth }) => {
    const inputs = await prompts([
      {
        type: 'confirm',
        name: 'reAuth',
        initial: reAuth,
        message: 'Re-Authenticate app access to the document?',
      },
    ]);
  
    return inputs.reAuth;
  };*/


//  function getAnswer(){
//     const questions = [
//         {
//             type: 'text',
//             name: 'email',
//             message: 'Enter your email'
//         },
//         // {
//         //     type: 'password',
//         //     name: 'secret',
//         //     message: 'Tell me a secret'
//         // },
        
//     ];

//     const answers = prompts(questions);
//     console.log(answers);
//     // var oldemail = answers.email;

//     // var utc = new Date().toJSON().slice(0,10).replace(/-/g,'');

//     // var pos = oldemail.indexOf("@");
//     // var newemail = oldemail.slice(0, pos) + "+" + utc + oldemail.slice(pos);

//     // console.log(newemail);
//     return answers.email;
//   }

//   var response =  getAnswer();

//   console.log(response);

//   var x = myFunction(4, 3);
// console.log(x);

// function myFunction(a, b) {
//   return a * b;
// }
  

const value = async function getParameters(){
    const questions = [
        {
            type: 'text',
            name: 'email',
            message: `What's your email?`,
            // initial: `terkelg`,
            // format: v => `@${v}`
        },
    ];

    const answers = await prompts(questions);
    console.log(answers);
    return Object.assign({}, answers);
};


const response = {
    r: value(),
  };  

console.log('response:');

console.log(response.r);
