import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from sklearn.preprocessing import MinMaxScaler
from typing import Dict, List
import joblib
from django.conf import settings

class EnhancedJobRecommendationSystem:
    def __init__(self, model_name: str = 'paraphrase-MiniLM-L6-v2'):
        """
        Initialize the enhanced job recommendation system with BERT-based embeddings.

        Args:
            model_name (str): Name of the pre-trained BERT model to use.
        """
        self.job_data = None
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        self.bert_model = SentenceTransformer(model_name)
        self.scaler = MinMaxScaler()
        self.skills_tfidf_matrix = None
        self.skills_bert_matrix = None
        self.cache_file = settings.BASE_DIR / 'job_embeddings_cache.pkl'

    def preprocess_text(self, text: str) -> str:
        """
        Preprocess text data by cleaning and standardizing.

        Args:
            text (str): Input text to preprocess.

        Returns:
            str: Preprocessed text.
        """
        text = text.lower()
        text = ' '.join(text.split())
        text = ''.join(char for char in text if char.isalnum() or char in [',', ' '])
        return text

    def load_data(self, file_path: str):
        """
        Load and preprocess the job dataset.

        Args:
            file_path (str): Path to the CSV file containing job data.
        """
        try:
            cached_data = joblib.load(self.cache_file)
            self.job_data = cached_data['job_data']
            self.skills_tfidf_matrix = cached_data['tfidf_matrix']
            self.skills_bert_matrix = cached_data['bert_matrix']
        except FileNotFoundError:
            self.job_data = pd.read_csv(file_path)
            self.job_data['skills'] = self.job_data['skills'].apply(self.preprocess_text)
            self.skills_tfidf_matrix = self.tfidf_vectorizer.fit_transform(self.job_data['skills'])
            self.skills_bert_matrix = self.bert_model.encode(self.job_data['skills'].tolist())
            cache_data = {
                'job_data': self.job_data,
                'tfidf_matrix': self.skills_tfidf_matrix,
                'bert_matrix': self.skills_bert_matrix
            }
            joblib.dump(cache_data, self.cache_file)

    def calculate_similarity_scores(self, user_skills: str) -> np.ndarray:
        """
        Calculate combined similarity scores using both TF-IDF and BERT.

        Args:
            user_skills (str): User's skills string.

        Returns:
            np.ndarray: Combined similarity scores.
        """
        user_tfidf = self.tfidf_vectorizer.transform([user_skills])
        tfidf_similarity = cosine_similarity(user_tfidf, self.skills_tfidf_matrix).flatten()
        user_bert = self.bert_model.encode([user_skills])
        bert_similarity = cosine_similarity(user_bert, self.skills_bert_matrix).flatten()
        combined_similarity = 0.4 * tfidf_similarity + 0.6 * bert_similarity
        return combined_similarity

    def apply_filters(self, df: pd.DataFrame, preferences: Dict) -> pd.DataFrame:
        """
        Apply all filters based on user preferences.

        Args:
            df (pd.DataFrame): Input dataframe.
            preferences (Dict): User preferences.

        Returns:
            pd.DataFrame: Filtered dataframe.
        """
        filtered_df = df.copy()
        if preferences.get('preferred_location'):
            filtered_df = filtered_df[filtered_df['location'].str.contains(preferences['preferred_location'], case=False, na=False)]
        if preferences.get('preferred_industry'):
            filtered_df = filtered_df[filtered_df['industry'].str.contains(preferences['preferred_industry'], case=False, na=False)]
        if preferences.get('experience') is not None and 'experience_required' in filtered_df.columns:
            filtered_df = filtered_df[filtered_df['experience_required'] <= preferences['experience'] * 1.5]
        return filtered_df

    def get_recommendations(self, user_profile: Dict, num_recommendations: int = 5) -> List[Dict]:
        """
        Generate job recommendations with explanation scores.

        Args:
            user_profile (Dict): User preferences.
            num_recommendations (int): Number of recommendations to return.

        Returns:
            List[Dict]: List of recommended jobs with scores and explanations.
        """
        similarity_scores = self.calculate_similarity_scores(user_profile['skills'])
        recommendations = self.job_data.copy()
        recommendations['similarity_score'] = similarity_scores
        recommendations = self.apply_filters(recommendations, user_profile)
        recommendations = recommendations.sort_values('similarity_score', ascending=False).head(num_recommendations)
        recommendations['match_percentage'] = (recommendations['similarity_score'] * 100).round(2)

        results = []
        for _, job in recommendations.iterrows():
            explanation = self.generate_explanation(job, user_profile)
            results.append({
                'job_title': job['job_title'],
                'company': job['company'],
                'location': job['location'],
                'industry': job['industry'],
                'required_skills': job['skills'],
                'match_percentage': job['match_percentage'],
                'explanation': explanation
            })
        return results

    def generate_explanation(self, job: pd.Series, user_profile: Dict) -> str:
        """
        Generate human-readable explanation for the recommendation.

        Args:
            job (pd.Series): Job information.
            user_profile (Dict): User preferences.

        Returns:
            str: Explanation string.
        """
        explanations = []
        user_skills = set(user_profile['skills'].split(','))
        job_skills = set(job['skills'].split(','))
        matching_skills = user_skills.intersection(job_skills)
        if matching_skills:
            explanations.append(f"You have {len(matching_skills)} matching skills: {', '.join(matching_skills)}")
        if user_profile.get('preferred_location') and user_profile['preferred_location'] in job['location'].lower():
            explanations.append("Location matches your preference.")
        if user_profile.get('preferred_industry') and user_profile['preferred_industry'] in job['industry'].lower():
            explanations.append("Industry matches your preference.")
        return " | ".join(explanations) if explanations else "Based on overall skill similarity."
