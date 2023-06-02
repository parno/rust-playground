# Installing the Playground

## Set up Gist support

1. Create a new GitHub user
2. Create a [fine-grained personal acccess token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token)
    - Click on your profile in the upper right corner
    - Choose "Settings"
    - On the left side, choose "Developer Settings"
    - Choose "Personal access tokens"


## Set up the lxc container

The following worked on an Ubuntu 18.10 machine.  Most of the container's configuration is
done via [cloud-init](https://cloudinit.readthedocs.io/en/latest/index.html), which in theory
means that it is portable to multiple cloud providers (i.e., instead of lxc).

- Install lxd:
    ```sudo snap install lxd```

- Double check the configuration in `rust-playground/deployment/lxc-config.yaml`
    - Check the email address used in the "Configure TLS step"

- Initialize lxd:
  ```
  sudo lxd init
      Would you like to use LXD clustering? (yes/no) [default=no]: no
      Do you want to configure a new storage pool? (yes/no) [default=yes]: 
      Name of the new storage pool [default=default]: 
      Name of the storage backend to use (ceph, dir, lvm, btrfs) [default=btrfs]: dir
      Would you like to connect to a MAAS server? (yes/no) [default=no]: 
      Would you like to create a new local network bridge? (yes/no) [default=yes]: 
      What should the new bridge be called? [default=lxdbr0]: 
      What IPv4 address should be used? (CIDR subnet notation, “auto” or “none”) [default=auto]: 
      What IPv6 address should be used? (CIDR subnet notation, “auto” or “none”) [default=auto]:     
      Would you like the LXD server to be available over the network? (yes/no) [default=no]: 
      Would you like stale cached images to be updated automatically? (yes/no) [default=yes]: 
      Would you like a YAML "lxd init" preseed to be printed? (yes/no) [default=no]: 
  ```

- Create and launch the container
  ```
  sudo lxc launch ubuntu:jammy/amd64 playground < rust-playground/deployment/lxc-config.yaml 
  ```

    - You can check on its installation progress via:
      ```
      sudo lxc exec playground -- /bin/bash
      cloud-init status --long --wait
      less /var/log/cloud-init{.log,-output.log}
      ```

- Final configuration inside the container
  0. Connect to the container
     ```
     sudo lxc exec playground -- /bin/bash
     ```
  1. Enable Gist support
      - Edit `/etc/systemd/system/playground.service` to add your GitHub
        fine-grained personal acccess token to the entry for `PLAYGROUND_GITHUB_TOKEN`
      - As root, run:
        ```
        systemctl daemon-reload
        service playground restart
        ```


