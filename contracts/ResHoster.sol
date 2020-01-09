pragma solidity ^0.6.1;
contract ResHoster {
  mapping(address => string)public Resume;
  function addResume(
    string memory resume
   ) public {
    Resume[msg.sender] = resume;
  }
}