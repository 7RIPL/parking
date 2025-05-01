CREATE DATABASE parking_system;

cd backend 

create file
.env 
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=you_password 
DB_NAME=parking_system
JWT_SECRET=your_jwt_secret_key
PORT=3000

npm install
npm run start:dev

cd frontend
npm install
npm start

for checking
INSERT INTO parking_spots (location) VALUES
('ул. Ленина, 10, парковка A'),
('ул. Советская, 25, парковка B'),
('пр. Победы, 5, парковка C'),
('ул. Мира, 15, парковка D'),
('ул. Центральная, 30, парковка E');
