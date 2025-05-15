import unittest
import numpy as np
import torch
from ..models.music_generator import MusicGenerator
from ..preprocessing.data_processor import MusicPreprocessor

class TestMusicGenerator(unittest.TestCase):
    def setUp(self):
        self.input_size = 128
        self.hidden_size = 256
        self.output_size = 128
        self.model = MusicGenerator(
            input_size=self.input_size,
            hidden_size=self.hidden_size,
            output_size=self.output_size
        )
        self.preprocessor = MusicPreprocessor()
    
    def test_model_output_shape(self):
        # Create mock input data
        batch_size = 4
        seq_length = 10
        x = torch.randn(batch_size, seq_length, self.input_size)
        
        # Get model output
        output = self.model(x)
        
        # Verify output dimensions
        expected_shape = (batch_size, seq_length, self.output_size)
        self.assertEqual(output.shape, expected_shape)
    
    def test_preprocessor(self):
        # Create mock audio data
        sample_length = 22050  # 1 second of audio
        mock_audio = np.random.randn(sample_length)
        
        # Test feature extraction
        features = self.preprocessor.extract_features(mock_audio)
        self.assertIsNotNone(features)
        
        # Test feature normalization
        normalized = self.preprocessor.normalize_features(features)
        self.assertIsNotNone(normalized)
        self.assertTrue(np.all(normalized >= 0) and np.all(normalized <= 1))

if __name__ == '__main__':
    unittest.main()