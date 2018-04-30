for (( i = 0; i < 1000; ++i ))
do 
	docker exec peer0.org1.example.com peer chaincode invoke -o orderer.example.com:7051  --tls $CORE_PEER_TLS_ENABLED --cafile /fabric-scripts/hlfv1/composer/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp/tlscacerts/tlsca.org1.example.com-cert.pem  -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["update","'$1'","'$2'","'$3'"]}' &
done
