import React from "react";
import NavBar from "../navbar/NavBar";
import CommentAddBox from "../comment/CommentAddBox";
import "./PlaceDetail.css";
import { Layout, Carousel, Descriptions, Rate, message } from 'antd';
import * as axios from 'axios';
import AuthService from "../../services/auth.service";
import { Link } from 'react-router-dom';



const { Footer } = Layout;

const key = 'updatable';

class PlaceDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			item: {
				name: "",
				phoneNumber: "",
				time: "",
				date: "",
				peopleNumber: "",
				placeID: "",
				placeName: "",
				placeImage: "",
				placeAddress: "",
				userID: "",
				username: "",
				userEmail: "",
				bookingAt: "",
				status: "processing",

			},
			currentUser: undefined,
			palaceInfo: {},
			visible: false,
			comments: [],
			submitting: false,
			EdtValue: '',
		};
	}

	componentDidMount() {
		axios.get(
			`https://enigmatic-everglades-66523.herokuapp.com/palace/${this.props.match.params.id}`
		)
			.then(response => {
				let item = this.state.item
				item.placeID = response.data.allPalace.id;
				item.placeName = response.data.allPalace.name;
				item.placeAddress = response.data.allPalace.address;
				item.placeImage = response.data.allPalace.image;
				this.setState({
					palaceInfo: response.data.allPalace,
					item: item,
				});
				console.log(this.state.palaceInfo);
				console.log(this.props.match.params.id);
			})
			.catch(err => console.log(err));

		const user = AuthService.getCurrentUser();

		if (user) {
			let item = this.state.item
			item.username = user.username;
			item.userEmail = user.email;
			item.userID = user.id
			this.setState({
				currentUser: user,
				item: item,
			});
		}
	}

	onClickChangePage = e => {
		this.setState({
			currentPage: e.key,
		});
	};

	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	handleAddCmtSubmit = () => {
		if (!this.state.EdtValue) {
			return;
		}

		if (!this.state.currentUser) {
			return;
		}

		this.setState({
			submitting: true,
		});

		let value = this.state.EdtValue;

		const CmtData = {
			userID: this.state.currentUser.id,
			username: this.state.currentUser.username,
			userEmail: this.state.currentUser.email,
			placeID: this.state.palaceInfo.id,
			avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4Hviqmchu_hUMBjF-CWJaFVpNVbS05hI5w&usqp=CAU',
			content: value,
			datetime: Date().toLocaleString(),
		};

		axios.post(`https://enigmatic-everglades-66523.herokuapp.com/api/comment/create`, CmtData)
			.then(res => {
				console.log(res.data)
				this.setState({
					submitting: false,
					EdtValue: '',
				});
			})
			.catch((err) => {
				console.log(err);
				setTimeout(() => {
					message.error({ content: "Thất bại", key, duration: 2 });
				}, 200);
			});
	};

	handleChangeCmtTextBox = e => {
		this.setState({
			EdtValue: e.target.value,
		});
	};

	handleDeleteCmt = cmtid => {
		axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/comment/delete/${cmtid}`, {userID: this.state.currentUser.id, role: this.state.currentUser.roles})
			.then(res => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}



	openMessage = () => {
		message.loading({ content: 'Loading...', key });
		setTimeout(() => {
			message.success({ content: 'Loaded!', key, duration: 2 });
		}, 1000);
	};



	render() {
		axios.get(
			`https://enigmatic-everglades-66523.herokuapp.com/api/comment/getAllCommentOfPlace/${this.props.match.params.id}`
		)
			.then(response => {
				let comments = [];
				response.data.comments.map((comment) => {
					let commentInstance = {
						author: comment.username,
						avatar: comment.avatar,
						content: comment.content,
						cmtid: comment._id,
						userid: comment.userID,
					};
					comments.push(commentInstance);
				});
				comments.reverse();
				this.setState({
					comments: comments,
				});
			})
			.catch(err => console.log(err));
		return (
			<>
				<NavBar
					currentPage={this.state.currentPage}
					onClickChangePage={this.onClickChangePage}
				/>
				<Layout className="layout" style={{ background: "#fff", marginLeft: 50, marginRight: 50 }}>
					<Carousel style={{ marginTop: 50 }} >
						<div>
							<img alt="place-ava" style={{ width: '100%' }} src={this.state.palaceInfo.image}></img>
						</div>
					</Carousel>
					<div className="ml-auto mr-auto col-md-8" style={{ marginTop: 25 }}>

						<h1 style={{ textAlign: "center" }}>{this.state.palaceInfo.name}</h1>

						<div>
							<Descriptions bordered column={1}>
								<Descriptions.Item label="Địa chỉ">{this.state.palaceInfo.address}</Descriptions.Item>
								<Descriptions.Item label="Thông tin chi tiết">{this.state.palaceInfo.description}</Descriptions.Item>
								<Descriptions.Item label="Giá thành">{this.state.palaceInfo.cost}</Descriptions.Item>
								<Descriptions.Item label="Đánh giá">
									<Rate allowHalf defaultValue={0} value={this.state.palaceInfo.vote} />
								</Descriptions.Item>
							</Descriptions>
						</div>
						{this.state.currentUser ? (<>
							<div style={{ margin: 25 }}>
								<div style={{ textAlign: "center" }}>
								</div>
							</div>
						</>) : (
							<>
								<div style={{ margin: "7em" }}>
									<h2 style={{ textAlign: "center" }}><Link to="/login">Đăng nhập</Link> để đăng tải bình luận của bạn !</h2>
								</div>
							</>
						)}
						<h3>Bình luận</h3>
						<CommentAddBox
							comments={this.state.comments}
							submitting={this.state.submitting}
							handleChange={this.handleChangeCmtTextBox}
							handleSubmit={this.handleAddCmtSubmit}
							handleDelete={this.handleDeleteCmt}
							value={this.state.EdtValue}
							currentUser={this.state.currentUser}

						/>

					</div>

					<Footer style={{ textAlign: 'center' }}> Test </Footer>
				</Layout>
			</>
		);
	}
}

export default PlaceDetail;
