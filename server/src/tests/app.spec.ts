import request from "supertest"
//skip if using jest
import {describe,it,expect} from "vitest"
import app from "../server"


//User Controller tests
describe("User tests", ()=>{
    it("should add a new user",()=>{
        //the request body
        const requestBody = {
            userName:"Samuel Ndambuki",
            email:"sam.ndambuki08@gmail.com",
            password:"N10234424008s",
            isAdmin:false
        }
        //give control to supertest in order for it to execute your application
        return request(app)
        .post('/users')
        //sends the request body
        .send(requestBody)
        .expect('Content-Type',/json/)
        //success request
        .expect(201)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('User added successfully!')
                })
            )
        })
    }),




    it('should get user by ID', async () => {
        const response = await request(app)
          .get('/users/9ec4f077-e521-498a-8954-d6cbcef84230')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6IlNhbXVlbCBOZGFtYnVraSIsImVtYWlsIjoidGVjaGZsdXg2QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMjBUMTY6Mzk6NDEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMjBUMjE6MjI6MTQuMDAwWiIsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjowLCJpYXQiOjE2ODczNTY2MjEsImV4cCI6MTY4NzcxNjYyMX0.Lq1tzUhJ9ETnPdSF0laD9admMKQWNALnoU9TGN1SAcg')
          .expect('Content-Type', /json/)
          .expect(200);
    
        expect(response.body).toEqual(
          expect.objectContaining({
            userId: expect.any(String),
      userName: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      emailSent: expect.any(Number),
      isDeleted: expect.any(Number),
      isAdmin: expect.any(Number),
          })
        );
      });



    it('should get all users', async () => {
        const response = await request(app)
          .get('/users')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODcyNjk3NjIsImV4cCI6MTY4NzYyOTc2Mn0.vi22JzU_00aVqqXEXN9xHRXNBqQfV09H68-UNzxWWOA')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              userId: expect.any(String),
              userName: expect.any(String),
              email: expect.any(String),
              password: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              emailSent: expect.any(Number),
              isDeleted: expect.any(Number),
              isAdmin: expect.any(Number),
            }),
          ])
        );
      });



    it('should update a user', async () => {
        const userId = '9ec4f077-e521-498a-8954-d6cbcef84230'; 
        const updatedUser = {
          userName: 'test',
          email: 'test@gmail.com',
          password: 'N10234424008s',
        };
      
        const response = await request(app)
          .put(`/users/${userId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6IlNhbXVlbCBOZGFtYnVraSIsImVtYWlsIjoidGVjaGZsdXg2QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMjBUMTY6Mzk6NDEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMjBUMjE6MjI6MTQuMDAwWiIsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjowLCJpYXQiOjE2ODczNTY2MjEsImV4cCI6MTY4NzcxNjYyMX0.Lq1tzUhJ9ETnPdSF0laD9admMKQWNALnoU9TGN1SAcg')
          .send(updatedUser)
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'User updated successfully!',
        });
      });




    it('should delete a user', async () => {
        const userId = '9dbd96a6-0c4c-44f4-a984-651aeb765bd5'; 
      
        const response = await request(app)
          .delete(`/users/${userId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODcyNjk3NjIsImV4cCI6MTY4NzYyOTc2Mn0.vi22JzU_00aVqqXEXN9xHRXNBqQfV09H68-UNzxWWOA')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'User deleted!',
        });
      });



    it('should login a user', async () => {
        const email = 'test@gmail.com'; 
        const password = 'N10234424008s'; 
      
        const response = await request(app)
          .post('/login')
          .send({ email, password })
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'Login Successful!',
          token: expect.any(String),
          isAdmin: expect.any(Boolean),
        });
      });
})


describe("Question Tests",()=>{

    it('should add a question', async () => {
        const userId = '9ec4f077-e521-498a-8954-d6cbcef84230';
        const questionData = {
          userId,
          title: 'Test Question',
          details: 'This is a test question.',
          tried: 'I have tried...',
          tags:  'question'
        };
      
        const response = await request(app)
          .post('/questions')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .send(questionData)
          .expect('Content-Type', /json/)
          .expect(201);
      
        expect(response.body).toEqual({
          message: 'Question added successfully!',
        });
      });




    it('should update a question', async () => {
        const questionId = 'ac499f2e-4f29-467f-8086-f3b1e0f9344e';
        const updatedQuestion = {
          title: 'Updated Test Question',
          details: 'This is an updated test question.',
          tried: 'I have tried...',
          tags: 'updated question',
        };
      
        const response = await request(app)
          .put(`/questions/${questionId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .send(updatedQuestion)
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'Question updated successfully!',
        });
      });


      
    it('should delete a question', async () => {
        const questionId = 'ac499f2e-4f29-467f-8086-f3b1e0f9344e';
      
        const response = await request(app)
          .delete(`/questions/${questionId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODczNjA2NDIsImV4cCI6MTY4NzcyMDY0Mn0.AYAnssVAkCbmA2sM7_plhyT1xPHy_Mh_E_SVXhBMMIY')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'Question deleted successfully!',
        });
      });

})

describe("Answer tests",()=>{
    it('should add an answer', async () => {
        const answer = {
          userId: '9ec4f077-e521-498a-8954-d6cbcef84230',
          questionId: '4e69f2ec-290a-4a49-8a45-2c0c7cdbe69e',
          body: 'This is an answer.',
        };
      
        const response = await request(app)
          .post('/answers')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .send(answer)
          .expect('Content-Type', /json/)
          .expect(201);
      
        expect(response.body).toEqual({
          message: 'Answer added successfully!',
        });
      });




    it('should update an answer', async () => {
        const answerId = '3d4f228f-68b8-4a02-8331-8c42b0c93285';
        const updatedAnswer = {
          userId: '9ec4f077-e521-498a-8954-d6cbcef84230',
          questionId: '942da41d-4d83-4f24-8984-27211549489f',
          body: 'This is the updated answer.',
        };
      
        const response = await request(app)
          .put(`/answers/${answerId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .send(updatedAnswer)
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'Answer updated successfully!',
        });
      });



    
    it('should get all answers', async () => {
        const response = await request(app)
          .get('/answers')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
      });




    it('should get answer by ID', async () => {
        const answerId = '3d4f228f-68b8-4a02-8331-8c42b0c93285';
        
        const response = await request(app)
          .get(`/answers/${answerId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toBeDefined();
        expect(response.body.answerId).toBe(answerId);
      });




    it('should delete an answer', async () => {
        const answerId = '3d4f228f-68b8-4a02-8331-8c42b0c93285';
      
        const response = await request(app)
          .delete(`/answers/${answerId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'Answer deleted successfully!',
        });
      });  
})




describe("Tag tests",()=>{
    it('should add a tag', async () => {
        const tagName = 'C#';
        
        const response = await request(app)
          .post('/tags')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODczNjA2NDIsImV4cCI6MTY4NzcyMDY0Mn0.AYAnssVAkCbmA2sM7_plhyT1xPHy_Mh_E_SVXhBMMIY') 
          .send({ tagName })
          .expect('Content-Type', /json/)
          .expect(201);
        
        expect(response.body).toEqual({
          message: 'Tag added successfully!',
          tagId: expect.any(String),
        });
      });




    it('should get all tags', async () => {
        const response = await request(app)
          .get('/tags')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODczNjA2NDIsImV4cCI6MTY4NzcyMDY0Mn0.AYAnssVAkCbmA2sM7_plhyT1xPHy_Mh_E_SVXhBMMIY') 
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
      });




    it('should get a tag by ID', async () => {
        const tagId = '708f0872-8bde-47e3-9051-ab1577d9020c'; 
      
        const response = await request(app)
          .get(`/tags/${tagId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODczNjA2NDIsImV4cCI6MTY4NzcyMDY0Mn0.AYAnssVAkCbmA2sM7_plhyT1xPHy_Mh_E_SVXhBMMIY') 
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toBeDefined();
        expect(response.body.tagId).toBe(tagId);
      });



      
    it('should update a tag', async () => {
        const tagId = '708f0872-8bde-47e3-9051-ab1577d9020c'; 
        const newTagName = 'Python';
        
        const response = await request(app)
          .put(`/tags/${tagId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODczNjA2NDIsImV4cCI6MTY4NzcyMDY0Mn0.AYAnssVAkCbmA2sM7_plhyT1xPHy_Mh_E_SVXhBMMIY') 
          .send({ tagName: newTagName })
          .expect('Content-Type', /json/)
          .expect(200);
        
        expect(response.body).toEqual({
          message: 'Tag updated successfully!',
          tagId: tagId,
        });
      });





    it('should delete a tag by ID', async () => {
        const tagId = '708f0872-8bde-47e3-9051-ab1577d9020c'; 
      
        const response = await request(app)
          .delete(`/tags/${tagId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzRiYzBhZC01ZjA0LTQxYTEtYTdkYi1hZjVmOThjNGRmMTkiLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxuZGFtYnVraTQwMUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTIwVDE2OjQwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsImVtYWlsU2VudCI6MCwiaXNEZWxldGVkIjowLCJpc0FkbWluIjoxLCJpYXQiOjE2ODczNjA2NDIsImV4cCI6MTY4NzcyMDY0Mn0.AYAnssVAkCbmA2sM7_plhyT1xPHy_Mh_E_SVXhBMMIY') 
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'Tag deleted successfully!',
          tagId: tagId,
        });
      });
})

describe("Votes Test",()=>{
    it('should upvote an answer', async () => {
        const answerId = '3d4f228f-68b8-4a02-8331-8c42b0c93285'; 
        const userId = '9ec4f077-e521-498a-8954-d6cbcef84230'; 
      
        const response = await request(app)
          .post(`/votes/upvote/${answerId}/${userId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'Answer upvoted successfully.',
        });
      });


      
      it('should downvote an answer', async () => {
        const answerId = '96a8b387-a8dd-4562-a12f-aff39d94d5be'; 
        const userId = '9ec4f077-e521-498a-8954-d6cbcef84230'; 
      
        const response = await request(app)
          .post(`/votes/downvote/${answerId}/${userId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toEqual({
          message: 'Answer downvoted successfully.',
        });
      });
})

describe("Question Tag Tests",()=>{
    it('should add a question tag', async () => {
        const questionId = '942da41d-4d83-4f24-8984-27211549489f'; 
        const tagId = '240e474a-4969-4592-84fd-0d2743674366'; 
      
        const response = await request(app)
          .post('/questionTag')
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .send({ questionId, tagId })
          .expect('Content-Type', /json/)
          .expect(201);
      
        expect(response.body).toEqual({
          message: 'Question tag added successfully!',
        });
      });




    it('should get question tags by question ID', async () => {
        const questionId = '942da41d-4d83-4f24-8984-27211549489f'; 
      
        const response = await request(app)
          .get(`/questionTag/${questionId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(response.body).toBeDefined();
      });




    it('should get question tags by tag ID', async () => {
        const tagId = '240e474a-4969-4592-84fd-0d2743674366'; 
      
        const response = await request(app)
          .get(`/questionTag/${tagId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .expect('Content-Type', /json/)
          .expect(200);
        expect(response.body).toBeDefined();
      });



    
    it('should get question tags by tag ID', async () => {
        const tagId = '240e474a-4969-4592-84fd-0d2743674366'; 
      
        const response = await request(app)
          .get(`/questionTag/${tagId}`)
          .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWM0ZjA3Ny1lNTIxLTQ5OGEtODk1NC1kNmNiY2VmODQyMzAiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQxNjozOTo0MS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yMVQxNzo0MzowNS4wMDBaIiwiZW1haWxTZW50IjowLCJpc0RlbGV0ZWQiOjAsImlzQWRtaW4iOjAsImlhdCI6MTY4NzM2MDIwMywiZXhwIjoxNjg3NzIwMjAzfQ.BSUtxi8q99lTYG6DSFjW9X6ir1yk8ujuCDvjgQ5bd8I')
          .expect('Content-Type', /json/)
          .expect(200);
      
        // Assert the response body or structure as needed
        expect(response.body).toBeDefined();
      });
      
})