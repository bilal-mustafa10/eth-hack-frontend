import React, {useEffect, useState} from 'react';
import Layout from "../components/layout";
import styles from './dashboard.module.css';
import {ethers} from "ethers";
import addresses from "../blockchain-config/contract_address.json";
import contractABI from "../blockchain-config/abi.json";
import { useAccount } from 'wagmi';
import { useReadContracts } from 'wagmi'
const contractAddress = "0x63ae84c0be6D8db645e7341b62BB30B6facd5f71";
import Modal from "../components/modal";
console.log(contractABI)

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileCategory, setFileCategory] = useState('');
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
  const {address} = useAccount();
  console.log("Hi there!")
  console.log(address)
  const {data} = useReadContracts({
      contracts: [
        {
          abi: contractABI,
          address: contractAddress,
          functionName: 'isTagValid',
          args:['Passports']
        }
      ]
    }
  )
  console.log(data)

  useEffect(() => {
    console.log(contractAddress)

    const fetchDocuments = async () => {
      // Connect to the Ethereum network

      // const provider = new ethers.BrowserProvider(window.ethereum);

      // const abi = [
      //   "function getDocuments(string memory _documentType) public view returns (string[] memory)"
      // ]
      // // Connect to the contract
      // const contract = new ethers.Contract(contractAddress, abi, provider);
      // console.log(contract.getDocuments)

      // // Call the getDocuments function on the contract
      // const result = await contract.getDocuments("Passports");
      // console.log(result)

    };

    fetchDocuments();
  }, []);


    const tableData = [
        {id: 1, documentName: 'Document 1', documentTag: 'Tag 1'},
        {id: 2, documentName: 'Document 2', documentTag: 'Tag 2'},
        {id: 3, documentName: 'Document 3', documentTag: 'Tag 3'},
        {id: 4, documentName: 'Document 4', documentTag: 'Tag 4'},
        {id: 5, documentName: 'Document 5', documentTag: 'Tag 5'},
    ];


    return (
        <Layout>
            <div className={styles.dashboardContainer}>
                <h1 className={styles.dashboardTitle}>Dashboard</h1>
                <div className={styles.buttonContainer}>
                    <div>
                        <p>Select document type to retrieve</p>
                        <select className={styles.dropdown}>
                            <option value="Medical Records">Medical Records</option>
                            <option value="Passports">Passports</option>
                            <option value="Emergency Information">Emergency Information</option>
                            <option value="Education Transcripts">Education Transcripts</option>
                            <option value="Legal Contracts">Legal Contracts</option>
                            <option value="Education Transcripts">Misc</option>
                        </select>
                    </div>

                    <input
                        type="file"
                        onChange={handleFileSelect}
                        style={{display: 'none'}} // Hide the actual file input
                        id="file-upload" // Reference for the label
                    />
                    <label htmlFor="file-upload" className={styles.uploadButton}>
                        Upload Document
                    </label>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.styledTable}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Document Name</th>
                            <th>Document Tag</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map(data => (
                            <tr key={data.id} className={data.id % 2 === 1 ? styles.activeRow : ''}>
                                <td><b>{data.id}</b></td>
                                <td>{data.documentName}</td>
                                <td>{data.documentTag}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {isModalOpen && (
                    // Replace ModalComponent with your actual modal component
                    <Modal
                        fileName={selectedFile?.name !== undefined ? selectedFile.name : 'No file selected'}
                        file={selectedFile}
                        category={fileCategory}
                        setCategory={setFileCategory}
                        onClose={closeModal}
                    />
                )}
            </div>
        </Layout>
    );
}
