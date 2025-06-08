import axiosInstance from '@/axiosInstance';

// const getRandomStatement = async (): Promise<string> => {
//   try {
//     const response = await axiosInstance.get('statements');
//     return response.data.statement;
//   } catch (error) {
//     console.error('Error fetching random statement:', error);
//     throw error;
//   }
// };

const getAllStatements = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get('statements');
    return response.data;
  } catch (error) {
    console.error('Error fetching all statements:', error);
    throw error;
  }
};

const StatementService = {
  getAllStatements,
};

export default StatementService;
