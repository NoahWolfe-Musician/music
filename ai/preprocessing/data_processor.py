import numpy as np
import librosa

class MusicPreprocessor:
    def __init__(self, sr=22050, hop_length=512, n_mels=128):
        self.sr = sr
        self.hop_length = hop_length
        self.n_mels = n_mels
    
    def load_audio(self, file_path):
        """Load audio file"""
        try:
            audio, _ = librosa.load(file_path, sr=self.sr)
            return audio
        except Exception as e:
            print(f"Error loading audio file: {e}")
            return None
    
    def extract_features(self, audio):
        """Extract audio features"""
        if audio is None:
            return None
        
        # Extract mel spectrogram
        mel_spec = librosa.feature.melspectrogram(
            y=audio,
            sr=self.sr,
            n_mels=self.n_mels,
            hop_length=self.hop_length
        )
        
        # Convert to log scale
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
        
        return mel_spec_db
    
    def normalize_features(self, features):
        """Normalize features"""
        if features is None:
            return None
        
        # Min-max normalization
        normalized = (features - features.min()) / (features.max() - features.min())
        return normalized