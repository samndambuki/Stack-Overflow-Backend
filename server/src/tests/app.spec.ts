import request from "supertest"
//skip if using jest
import {describe,it,expect} from "vitest"
import app from "../server"


//User Controller tests
// describe("User tests", ()=>{
    // it("should add a new user",()=>{
    //     //the request body
    //     const requestBody = {
    //         userName:"Samuel Ndambuki",
    //         email:"sam.ndambuki08@gmail.com",
    //         password:"N10234424008s",
    //         isAdmin:false
    //     }
    //     //give control to supertest in order for it to execute your application
    //     return request(app)
    //     .post('/users')
    //     //sends the request body
    //     .send(requestBody)
    //     .expect('Content-Type',/json/)
    //     //success request
    //     .expect(201)
    //     .then((response:request.Response)=>{
    //         expect(response.body).toEqual(
    //             expect.objectContaining({
    //                 message:expect.stringMatching('User added successfully!')
    //             })
    //         )
    //     })
    // }),

    // it('should get user by ID', async () => {
    //     const response = await request(app)
    //       .get('/users/9ec4f077-e521-498a-8954-d6cbcef84230')
    //       .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6IlNhbXVlbCBOZGFtYnVraSIsImVtYWlsIjoidGVjaGZsdXg2QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMjBUMTY6Mzk6NDEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMjBUMjE6MjI6MTQuMDAwWiIsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjowLCJpYXQiOjE2ODczNTY2MjEsImV4cCI6MTY4NzcxNjYyMX0.Lq1tzUhJ9ETnPdSF0laD9admMKQWNALnoU9TGN1SAcg')
    //       .expect('Content-Type', /json/)
    //       .expect(200);
    
    //     expect(response.body).toEqual(
    //       expect.objectContaining({
    //         userId: expect.any(String),
    //   userName: expect.any(String),
    //   email: expect.any(String),
    //   password: expect.any(String),
    //   createdAt: expect.any(String),
    //   updatedAt: expect.any(String),
    //   emailSent: expect.any(Number),
    //   isDeleted: expect.any(Number),
    //   isAdmin: expect.any(Number),
    //       })
    //     );
    //   });

    // it('should get all users', async () => {
    //     const response = await request(app)
    //       .get('/users')
    //       .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODcyNjk3NjIsImV4cCI6MTY4NzYyOTc2Mn0.vi22JzU_00aVqqXEXN9xHRXNBqQfV09H68-UNzxWWOA')
    //       .expect('Content-Type', /json/)
    //       .expect(200);
      
    //     expect(response.body).toEqual(
    //       expect.arrayContaining([
    //         expect.objectContaining({
    //           userId: expect.any(String),
    //           userName: expect.any(String),
    //           email: expect.any(String),
    //           password: expect.any(String),
    //           createdAt: expect.any(String),
    //           updatedAt: expect.any(String),
    //           emailSent: expect.any(Number),
    //           isDeleted: expect.any(Number),
    //           isAdmin: expect.any(Number),
    //         }),
    //       ])
    //     );
    //   });

    // it('should update a user', async () => {
    //     const userId = '9ec4f077-e521-498a-8954-d6cbcef84230'; 
    //     const updatedUser = {
    //       userName: 'test',
    //       email: 'test@gmail.com',
    //       password: 'N10234424008s',
    //     };
      
    //     const response = await request(app)
    //       .put(`/users/${userId}`)
    //       .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6IlNhbXVlbCBOZGFtYnVraSIsImVtYWlsIjoidGVjaGZsdXg2QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMjBUMTY6Mzk6NDEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMjBUMjE6MjI6MTQuMDAwWiIsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjowLCJpYXQiOjE2ODczNTY2MjEsImV4cCI6MTY4NzcxNjYyMX0.Lq1tzUhJ9ETnPdSF0laD9admMKQWNALnoU9TGN1SAcg')
    //       .send(updatedUser)
    //       .expect('Content-Type', /json/)
    //       .expect(200);
      
    //     expect(response.body).toEqual({
    //       message: 'User updated successfully!',
    //     });
    //   });

    // it('should delete a user', async () => {
    //     const userId = '9dbd96a6-0c4c-44f4-a984-651aeb765bd5'; 
      
    //     const response = await request(app)
    //       .delete(`/users/${userId}`)
    //       .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODcyNjk3NjIsImV4cCI6MTY4NzYyOTc2Mn0.vi22JzU_00aVqqXEXN9xHRXNBqQfV09H68-UNzxWWOA')
    //       .expect('Content-Type', /json/)
    //       .expect(200);
      
    //     expect(response.body).toEqual({
    //       message: 'User deleted!',
    //     });
    //   });

    // it('should login a user', async () => {
    //     const email = 'test@gmail.com'; 
    //     const password = 'N10234424008s'; 
      
    //     const response = await request(app)
    //       .post('/login')
    //       .send({ email, password })
    //       .expect('Content-Type', /json/)
    //       .expect(200);
      
    //     expect(response.body).toEqual({
    //       message: 'Login Successful!',
    //       token: expect.any(String),
    //       isAdmin: expect.any(Boolean),
    //     });
    //   });
// })


describe("Question Tests",()=>{

    // it('should add a question', async () => {
    //     const userId = '9ec4f077-e521-498a-8954-d6cbcef84230';
    //     const questionData = {
    //       userId,
    //       title: 'Test Question',
    //       details: 'This is a test question.',
    //       tried: 'I have tried...',
    //       tags:  'question'
    //     };
      
    //     const response = await request(app)
    //       .post('/questions')
    //       .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
    //       .send(questionData)
    //       .expect('Content-Type', /json/)
    //       .expect(201);
      
    //     expect(response.body).toEqual({
    //       message: 'Question added successfully!',
    //     });
    //   });

    // it('should update a question', async () => {
    //     const questionId = 'ac499f2e-4f29-467f-8086-f3b1e0f9344e';
    //     const updatedQuestion = {
    //       title: 'Updated Test Question',
    //       details: 'This is an updated test question.',
    //       tried: 'I have tried...',
    //       tags: 'updated question',
    //     };
      
    //     const response = await request(app)
    //       .put(`/questions/${questionId}`)
    //       .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
    //       .send(updatedQuestion)
    //       .expect('Content-Type', /json/)
    //       .expect(200);
      
    //     expect(response.body).toEqual({
    //       message: 'Question updated successfully!',
    //     });
    //   });
      
    // it('should delete a question', async () => {
    //     const questionId = 'ac499f2e-4f29-467f-8086-f3b1e0f9344e';
      
    //     const response = await request(app)
    //       .delete(`/questions/${questionId}`)
    //       .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODczNjA2NDIsImV4cCI6MTY4NzcyMDY0Mn0.AYAnssVAkCbmA2sM7_plhyT1xPHy_Mh_E_SVXhBMMIY')
    //       .expect('Content-Type', /json/)
    //       .expect(200);
      
    //     expect(response.body).toEqual({
    //       message: 'Question deleted successfully!',
    //     });
    //   });
      
    
      

})


