# AI Research Assistant

## Install the Necessary Packages

All the necessary Python pacakges are added to the [requirements.txt](/backend/services/requirements.txt) file. Run the below command to install all the packages from this file.

```bash
pip3 install -r requirements.txt
```

The below command installs the necessary Go gRPC packages.

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

Add the installed Go protoc-gen-go package to PATH

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

## Generate the gRPC Files

Run the below command from the /backend folder to generate the Python gRPC files.

```bash
python3 -m grpc_tools.protoc -I./proto --python_out=./services/proto --grpc_python_out=./services/proto ./proto/service.proto
```

Run the below command from the /backend folder to generate the Go gRPC files.

```bash
protoc --proto_path=./proto --go_out=./api/proto --go_opt=paths=source_relative --go-grpc_out=./api/proto --go-grpc_opt=paths=source_relative ./proto/service.proto
```