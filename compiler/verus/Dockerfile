# docker build -t verus . 
# docker run -it verus

FROM --platform=linux/amd64 ubuntu:22.04 as base
ENV REFRESH_DATE "2023-05-25"

RUN apt-get update && apt-get install -y \
  unzip \
  curl \
  wget \
  git \
  build-essential \
 && rm -rf /var/lib/apt/lists/*

FROM base as packages


RUN useradd -m playground -d /playground
RUN usermod -p '!!' root # Disable all passwords for root

# Attach the security note
ADD --chown=playground attach_notice.sh security_notice.txt /playground/
RUN /playground/attach_notice.sh /playground/security_notice.txt /etc/passwd && \
    /playground/attach_notice.sh /playground/security_notice.txt /etc/shadow && \
    rm -f /playground/attach_notice.sh

USER playground
ENV USER=playground
ENV PATH=/playground/.cargo/bin:$PATH
WORKDIR /playground

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --profile minimal --default-toolchain 1.68.0

ADD --chown=playground entrypoint.sh /playground/tools/

FROM packages as useradded


# Acquire and build Verus
RUN git clone https://github.com/verus-lang/verus.git
RUN /bin/bash -c 'cd ~/verus/source && ./tools/get-z3.sh'
# Running in QEMU, activate needs to use cargo --config net.git-fetch-with-cli=true fetch 
RUN /bin/bash -c 'cd ~/verus/tools/vargo && cargo --config net.git-fetch-with-cli=true build --release'

FROM useradded as verus-prep

RUN /bin/bash -c 'cd verus/source && source ../tools/activate && vargo build --release'

ENTRYPOINT ["/playground/tools/entrypoint.sh"]
