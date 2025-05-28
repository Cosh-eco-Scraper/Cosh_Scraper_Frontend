import axiosInstance from '@/axiosInstance';

const getRandomStatement = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('statements');
    return response.data.statement;
  } catch (error) {
    console.error('Error fetching random statement:', error);
    throw error;
  }
};

const StatementService = {
  getRandomStatement,
};

export default StatementService;
