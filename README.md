Steps to deploy the node:
1.Checkout this repository 
2.Install Nodejs, NPM in the server. 
3.Get a copy of config.js and put it under /campaignreport/: this project requires a configuration file config.js which contains security information and is not committed into the repository, please check with the related owner to get the file.
4.Run '$node /campaignreport/bin/www' to start the node, or run "sudo nohup /home/timothytang/tools/node-v4.4.5-linux-x64/bin/node /home/timothytang/project/campaignreport/bin/www &" to start it in service mode.