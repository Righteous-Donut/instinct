// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Minted is ERC1155, Ownable, ERC1155Supply {
    uint256 public cost = 0.01 ether;
    uint256 private _tokenIdCounter = 0;

    constructor() ERC1155("") {}

    function mint(uint256 amount, string memory setUri) public payable {
        require(msg.value >= cost * amount, "Insufficient funds");

        for (uint256 i = 0; i < amount; i++) {
            uint256 newTokenId = _tokenIdCounter;
            _mint(msg.sender, newTokenId, 1, "");
            _setURI(newTokenId, setUri);
            _tokenIdCounter++;
        }
    }

    function _setURI(uint256 tokenId, string memory newuri) internal {
        emit URI(newuri, tokenId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function totalSupply(uint256 id) public view override returns (uint256) {
        return super.totalSupply(id);
    }

    function getTokenIdCounter() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
