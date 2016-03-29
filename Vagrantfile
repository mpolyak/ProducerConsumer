$script = <<SCRIPT

sudo apt-get update
sudo apt-get install -y curl build-essential 

curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash

source ~/.nvm/nvm.sh

echo "source ~/.nvm/nvm.sh" >> ~/.bashrc

nvm install v4.4.1
nvm alias default v4.4.1

npm install -g node-gyp

echo "cd /vagrant" >> ~/.bashrc

cd /vagrant

npm install --no-bin-links

mkdir node_modules/.bin

ln -s /vagrant/node_modules/mocha/bin/mocha /vagrant/node_modules/.bin/
ln -s /vagrant/node_modules/mocha/bin/_mocha /vagrant/node_modules/.bin/

SCRIPT

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |v|
    v.name = "ProducerConsumer"
    v.memory = 512
    v.cpus = 3
  end

  config.vm.box_check_update = false

  config.vm.provision :shell, inline: $script, privileged: false

  config.vm.network :forwarded_port, host: 8000, guest: 8000
end