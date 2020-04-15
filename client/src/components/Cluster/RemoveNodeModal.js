// Copyright 2020 Dgraph Labs, Inc. and Contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { sanitizeUrl } from "../../lib/helpers";
import { updateZeroUrl } from "../../actions/connection";

export default function RemoveNodeModal({ groupId, nodeId, onHide }) {
    const currentServer = useSelector(
        state => state.connection.serverHistory[0],
    );

    const [zeroUrlInput, setZeroUrl] = useState(
        currentServer.zeroUrl || "http://localhost:6080",
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateZeroUrl(zeroUrlInput));
    }, [sanitizeUrl(zeroUrlInput)]);

    const [removalStarted, setRemovalStarted] = useState(false);

    const getUrl = () =>
        `${sanitizeUrl(zeroUrlInput)}/removeNode?id=${nodeId}&group=${groupId}`;

    return (
        <Modal centered show={true} size="md" onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Remove node from Cluster</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Remove node <strong>#{nodeId}</strong> from group{" "}
                    <strong>#{groupId}</strong>
                </p>
                <Form.Group controlId="zeroUrlInput">
                    <Form.Label>Dgraph Zero URL:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="http://myzero:6080"
                        value={zeroUrlInput}
                        onChange={e => setZeroUrl(e.target.value)}
                    />
                </Form.Group>
                <Form.Label>
                    <br />
                    Removal URL:
                    <br />
                    <strong>{getUrl()}</strong>
                </Form.Label>
                {removalStarted ? (
                    <iframe
                        src={getUrl()}
                        width="100%"
                        height="90px"
                        backgroundColor="rgba(30, 96, 119, 0.25)"
                    ></iframe>
                ) : (
                    <Button
                        onClick={() => {
                            if (
                                !window.confirm(
                                    `Are you sure you want to remove node #${nodeId}? This operation cannot be undone`,
                                )
                            ) {
                                return;
                            }
                            if (
                                !window.confirm(
                                    `This is really dangerous. Second confirmation required.\nReally remove node #${nodeId}?`,
                                )
                            ) {
                                return;
                            }
                            setRemovalStarted(true);
                        }}
                        variant="danger"
                        className="pull-left"
                    >
                        Remove Node
                    </Button>
                )}
            </Modal.Body>
        </Modal>
    );
}
