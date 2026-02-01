# Smart Matching & Gamification

## 1. Smart Matching Algorithm

The matching algorithm connects learners with the most suitable mentors based on a weighted scoring system.

### Inputs
- **Learner Request**:
  - `Required Skill` (e.g., "React")
  - `Topic Difficulty` (Beginner/Intermediate/Advanced)
  - `Preferred Time` (e.g., "Monday Evening")
- **Mentor Profile**:
  - `Skills` (List of tags)
  - `Rating` (1-5 stars)
  - `Experience` (University year/Degree)
  - `Availability` (Time slots)
  - `Response Time` (Average time to accept requests)

### Logic (Weighted Score)
For each mentor in the database who has the *Required Skill*:

1.  **Skill Match (Binary)**: Must have the skill. (Filter step)
2.  **Availability Score (30%)**:
    - +30 if available at requested time.
    - +10 if available within +/- 2 hours.
    - 0 otherwise.
3.  **Rating Score (30%)**:
    - `(MentorRating / 5) * 30`
4.  **Experience Score (20%)**:
    - Higher weight for higher degrees or verified status.
5.  **Responsiveness Score (20%)**:
    - Higher score for lower average response time.

**Total Score = Availability + Rating + Experience + Responsiveness**

### Output
Returns a sorted list of mentors (JSON):
```json
[
  {
    "mentorId": "123",
    "name": "Alice",
    "matchScore": 85,
    "matchReasons": ["Available at your time", "Top Rated"]
  },
  ...
]
```

---

## 2. Gamification System

### Points Logic
| Action | Points Awarded |
| :--- | :--- |
| **Complete Profile** | 50 pts |
| **Verify Account** | 100 pts |
| **Complete Session (Mentor)** | 20 pts/hour |
| **Receive 5-Star Review** | 10 pts |
| **Daily Login Streak** | 5 pts |
| **Help a Peer (Free Session)** | 30 pts |

### Badge System
Badges are awarded based on thresholds.

| Badge Name | Criteria | Icon |
| :--- | :--- | :--- |
| **Newbie** | Register account | 🐣 |
| **Verified Mentor** | Complete verification | ✅ |
| **Rising Star** | 10 Sessions + >4.5 Rating | 🌟 |
| **Guru** | 50 Sessions + >4.8 Rating | 🎓 |
| **Speedster** | Avg response < 30 mins | ⚡ |
| **Community Hero** | 10 Free Sessions given | ❤️ |

### Leaderboard
- **Weekly Leaderboard**: Resets every Monday. Top 3 get a temporary "Top Mentor" profile flair.
- **All-Time Leaderboard**: Based on total lifetime points.

### Certificates
- **Trigger**: When a mentor reaches 100 hours of mentorship.
- **Action**: Generate a PDF certificate "Certificate of Excellence in Peer Mentorship" signed by the platform admin.
