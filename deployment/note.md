# Cài nodejs mới nhất
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs

# Cài pm2
npm install pm2 -g

# Cài nginx
sudo apt install -y nginx

# Tạo key Github
ssh-keygen -t ed25519 -C "trungnt2411@gmail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub

# Lấy code từ Github về
git clone git@github.com:sizuki159/BookStoreAPI.git

# Build project
cd BookStoreAPI
npm install
node ace build --production --ignore-ts-errors
npm ci --production


# Config nginx
sudo nano /etc/nginx/sites-available/api.sachviet.top

server {
    listen 80;
    server_name api.sachviet.top;
    
    location / {
        proxy_pass http://localhost:3333;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

sudo ln -s /etc/nginx/sites-available/api.sachviet.top /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# Run server
cd ~/let-link/build
cp .env build/.env
pm2 start server.js